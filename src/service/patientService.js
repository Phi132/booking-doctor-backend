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
                if (dataHasInDB && dataHasInDB.length === 0 || dataHasInDB === null) {
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
                            from: '"ONLINE SCHOOL"<thanhphi107610@gmail.com>', // sender address
                            to: data.emailPatient, // list of receivers
                            subject: "Thank you", // Subject line
                            text: "", // plain text body
                            html: `
                            <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;">
                            <center style="width: 100%; background-color: #ffff;">
                            <div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
                              &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
                            </div>
                            <div style="max-width: 600px; margin: 0 auto;" class="email-container">
                                <!-- BEGIN BODY -->
                              <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
                                  <tr>
                                  <td valign="top" class="bg_white" style="padding: 1em 2.5em 0 2.5em;">
                                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                          <tr>
                                              <td class="logo" style="text-align: center;">
                                                <h1><a href="#">ONLINE SCHOOL</a></h1>
                                              </td>
                                          </tr>
                                      </table>
                                  </td>
                                  </tr><!-- end tr -->
                                  <tr>
                                  <td valign="middle" class="hero bg_white" style="padding: 3em 0 2em 0;">
                                    <img src="https://colorlib.com/etc/email-template/10/images/email.png" alt="" style="width: 300px; max-width: 600px; height: auto; margin: auto; display: block;">
                                  </td>
                                  </tr>
                                  <!-- end tr -->
                                        <tr>
                                  <td valign="middle" class="hero bg_white" style="padding: 2em 0 4em 0;">
                                    <table style="margin: 0 auto">
                                        <tr>
                                            <td>
                                                <div class="text" style="padding: 0 2.5em; text-align: center;">
                                                    <h2>Bạn đã dặt lịch hẹn thành công</h2>
                                                    <h3>Thật tuyện vời khi chúng tôi nhận được lịch hẹn của ${data.namePatient} </h3>
                                                    <h3>Lịch hẹn của bạn vào lúc ${data.timeVi} ngày ${data.dateAppointment} </h3>
                                                    <p style="margin-top: 25px;">
                                                        <a href="${process.env.REACT_LINK}/verify-token-appointment?token=${token}&doctorid=${data.doctorid}" class="btn btn-primary"
                                                        style=" padding: 15px;
                                                                border-radius: 5px;
                                                                background: #30e3ca;
                                                                color: #000000;
                                                                font-weight: 600;
                                                                font-size: 14px;"
                                                        >
                                                            Ấn Vào đây để xác nhận
                                                        </a>
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                  </td>
                                  </tr><!-- end tr -->
                              
                        
                            </div>
                          </center>
                        </body>
                        `, // html body
                        });

                    } else {
                        let info = await transporter.sendMail({
                            from: '"ONLINE SCHOOL"<thanhphi107610@gmail.com>', // sender address
                            to: data.emailPatient, // list of receivers
                            subject: "Thank you", // Subject line
                            text: "", // plain text body
                            html: `
                            <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;">
                            <center style="width: 100%; background-color: #ffff;">
                            <div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
                              &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
                            </div>
                            <div style="max-width: 600px; margin: 0 auto;" class="email-container">
                                <!-- BEGIN BODY -->
                              <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
                                  <tr>
                                  <td valign="top" class="bg_white" style="padding: 1em 2.5em 0 2.5em;">
                                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                          <tr>
                                              <td class="logo" style="text-align: center;">
                                                <h1><a href="#">ONLINE SCHOOL</a></h1>
                                              </td>
                                          </tr>
                                      </table>
                                  </td>
                                  </tr><!-- end tr -->
                                  <tr>
                                  <td valign="middle" class="hero bg_white" style="padding: 3em 0 2em 0;">
                                    <img src="https://colorlib.com/etc/email-template/10/images/email.png" alt="" style="width: 300px; max-width: 600px; height: auto; margin: auto; display: block;">
                                  </td>
                                  </tr>
                                  <!-- end tr -->
                                        <tr>
                                  <td valign="middle" class="hero bg_white" style="padding: 2em 0 4em 0;">
                                    <table style="margin: 0 auto">
                                        <tr>
                                            <td>
                                                <div class="text" style="padding: 0 2.5em; text-align: center;">
                                                    <h2>You have successfully booked your appointment</h2>
                                                    <h3>
                                                    It was great when we received the appointment of ${data.namePatient} </h3>
                                                    <h3>
                                                    Schedule your appointment at ${data.timeEn} , ${data.dateAppointment} </h3>
                                                    <p style="margin-top: 25px;">
                                                        <a href="${process.env.REACT_LINK}/verify-token-appointment?token=${token}&doctorid=${data.doctorid}" class="btn btn-primary"
                                                        style=" padding: 15px;
                                                                border-radius: 5px;
                                                                background: #30e3ca;
                                                                color: #000000;
                                                                font-weight: 600;
                                                                font-size: 14px;"
                                                        >
                                                            
                                                            Click here to confirm
                                                        </a>
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                  </td>
                                  </tr><!-- end tr -->
                              
                            
                                </div>
                            </center>
                            </body>
                        `, // html body
                        });

                    }

                    resolve({
                        err: 0,
                        mess: "da gui thanh cong",
                        dataHasInDB
                    })

                } else {

                    resolve({
                        err: 10,
                        mess: "da co lich kham nay trong db",
                        dataHasInDB

                    })
                }

            } else {
                resolve({
                    err: 11,
                    mess: "gui thieu data",
                    dataHasInDB

                })
            }


            // console.log(data);





        } catch (e) {
            reject(e);
        }

    })



}

let verify = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(data);
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