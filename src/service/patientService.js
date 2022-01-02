const db = require('../models/index');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
const _ = require('lodash');
const nodemailer = require("nodemailer");
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const { editUserData } = require('./ApiCRUD');

// let builduuid = (token) => {
//     let uuid = token;
//     return uuid
// }
let token = uuidv4();

let submitInfoPatientHandle = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //console.log(data[0]);
            if (data && data.length > 0) {
                let dataHasInDB = await db.Bookings.findAll({
                    where: {
                        patientid: data[0].patientid,
                        doctorid: data[0].doctorid,
                        date: data[0].date,

                    },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'id']
                    },
                    raw: true,
                });
                //console.log("check gui lennnn ",dataHasInDB);
                let isCheck = _.differenceWith(data, dataHasInDB, (a, b) => {
                    return a.timetype === b.timetype;
                });
                // let token = uuidv4();
                // buil
                if (isCheck && isCheck.length > 0) {
                    await db.Bookings.create({
                        timetype: isCheck[0].timetype,
                        date: isCheck[0].date,
                        doctorid: isCheck[0].doctorid,
                        patientid: isCheck[0].patientid,
                        statusid: isCheck[0].statusid,
                        token: token,
                    });
                    resolve({
                        err: 0,
                        mess: "da tao lich kham",

                    })
                } else {

                    resolve({
                        err: 9,
                        mess: "da co lich kham nay",

                    })
                }

            }

        } catch (e) {
            reject(e);
        }

    })
}
let nodeMailer = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (data) {
                let dataHasInDB = [];
                dataHasInDB = await db.Bookings.findOne({
                    where: {
                        doctorid: data.doctorid,
                        date: data.date,
                        timetype: data.timetype
                    },
                    attributes: ["doctorid", "date", "timetype", "statusid", "patientid", "token"],
                    raw: true
                });

                //khi khong có lịch khám này mới gửi email
                if (dataHasInDB && dataHasInDB.length > 0) {
                    resolve({
                        err: 10,
                        mess: "da co lich kham nay trong db",

                    })
                } else {
                    let transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 465,
                        secure: true, // true for 465, false for other ports
                        auth: {
                            user: process.env.EMAIL_ACCOUNT, // generated ethereal user
                            pass: process.env.EMAIL_PASSWORD, // generated ethereal password
                        },
                    });

                    // send mail with defined transport object

                    if (data.language === 'vi') {
                        let info = await transporter.sendMail({
                            from: '"Thành Phi🥪🥪🥪🥪"<thanhphi107610@gmail.com>', // sender address
                            to: data.emailPatient, // list of receivers
                            subject: "Thank you", // Subject line
                            text: "", // plain text body
                            html: `
                        <h3> Gửi Ông/Bà ${data.namePatient} </h3>
    
                            <br />Cảm Ơn vì đã đặt lệnh ở trang <b>WeCare.com</b>
    
                            <br />Bạn có cuộc hẹn khám lúc <b>${data.timeEn} </b>
                            <br /><b>Vào lúc ${data.dateAppointment}. </b>
                            <br /> Với bác sĩ có id ....
                            <br /><a href="${process.env.REACT_LINK}/verify-token-appointment?token=${token}&doctorid=${data.doctorid}">Bấm vào đây để xác nhận </a>
                            <br />Cảm ơn bạn vì đã tin tưởng,
    
                        <br />We take care of you.
                        `, // html body
                        });

                    } else {
                        let info = await transporter.sendMail({
                            from: '"Thành Phi🥪🥪🥪🥪"<thanhphi107610@gmail.com>', // sender address
                            to: data.emailPatient, // list of receivers
                            subject: "Thank you", // Subject line
                            text: "", // plain text body
                            html: `
                        <h3> Dear ${data.namePatient} </h3>
    
                            <br />Thanks for requesting information on <b>WeCare.com</b>
    
                            <br />You have appointment at <b>${data.timeEn} in ${data.dateAppointment}. </b>
                            <br /> With doctor have id ....
                            <br /><a href="${process.env.REACT_LINK}/verify-token-appointment?token=${token}&doctorid=${data.doctorid}">Click here for confirm</a>
                            <br />Thank you,
    
                        <br />We take care of you.
                        `, // html body
                        });

                    }
                }

            }


            // console.log(data);

            resolve({
                err: 0,
                mess: "da gui thanh cong",
            })




        } catch (e) {
            reject(e);
        }

    })



}

let verify = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.doctorid) {
                resolve({
                    err: 1,
                    mess: "gui thieu token hoac email",
                })
            } else {
                let checkStatusAppointment = await db.Bookings.findOne({
                    where: {
                        doctorid: data.doctorid,
                        token: data.token,
                        statusid: 'S1',
                    },
                    raw: false
                })
                let checkStatusAppointment2 = await db.Bookings.findOne({
                    where: {
                        doctorid: data.doctorid,
                        token: data.token,
                        statusid: 'S2',
                    },
                    raw: false
                })


                if (checkStatusAppointment) {
                    checkStatusAppointment.statusid = 'S2'
                    await checkStatusAppointment.save();
                    resolve({
                        err: 0,
                        mess: "xac nhan thanh cong"
                    })
                }
                if (checkStatusAppointment2) {
                    resolve({
                        err: 2,
                        mess: "Lịch khám này đã được xác nhận",
                    })
                }

            }

        } catch (e) {
            reject(e);
        }
    })
}


module.exports = { submitInfoPatientHandle, nodeMailer, verify }