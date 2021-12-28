const db = require('../models/index');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const { reject } = require('lodash');
var salt = bcrypt.genSaltSync(10);
require('dotenv').config();

const MAX_NUMBER = process.env.MAX_NUMBER;

let getDetailDoctorId = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    err: 2,
                    mess: "chưa truyền id"
                })
            }
            let dataDetail = await db.Users.findOne({
                where: { id: id },
                attributes: {
                    exclude: ['password']
                },
                include: [
                    {
                        model: db.ckeditors,
                        attributes: ['contentHTML', 'description', 'doctorId']
                    },


                ],
                raw: false,
                // nest có tác dụng đổi positionData.valueVi thành 
                // thành object positionData{.....}
                nest: true,

            })

            if (dataDetail && dataDetail.image) {
                if (dataDetail.image) {
                    dataDetail.image = Buffer.from(dataDetail.image, 'base64').toString('binary');
                }
                resolve({
                    err: 0,
                    dataDetail
                })
            } else {
                resolve({
                    err: 1,
                    mess: "lấy detail doctor thất bại"
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

// lấy role
let getInfoDoctor = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    err: 2,
                    mess: "chưa truyền id"
                })
            }
            let dataDetail = await db.Users.findOne({
                where: { id: id },
                attributes: {
                    exclude: ['password', 'image']
                },
                include: [
                    {
                        model: db.allcodes, as: 'positionData',
                        attributes: ['valueEn', 'valueVi']
                    },
                    {
                        model: db.allcodes, as: 'genderData',
                        attributes: ['valueEn', 'valueVi']
                    },

                ],
                raw: true,
                // nest có tác dụng đổi positionData.valueVi thành 
                // thành object positionData{.....}
                nest: true,

            })

            if (dataDetail) {

                resolve({
                    err: 0,
                    dataDetail
                })
            } else {
                resolve({
                    err: 1,
                    mess: "lấy info doctor thất bại"
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

let saveSchedule = (dataSchedule) => {
    return new Promise(async (resolve, reject) => {
        try {
            //gui len
            let data = dataSchedule.detailSchedule;
            if (data && data.length > 0) {
                data = data.map((value, index) => {
                    value.maxnumber = MAX_NUMBER;
                    return value;
                })
            }
            if (data && data.length > 0) {
                let dataScheduleCheck = await db.schedules.findAll({
                    where: { doctorid: data[0].doctorid, appointment: data[0].appointment },
                    attributes: ["appointment", "timetype", "doctorid", "maxnumber", "timestamp"],
                    raw: true
                })
                let isCheck = _.differenceWith(data, dataScheduleCheck, (a, b) => {
                    return a.timetype === b.timetype && a.appointment === b.appointment;
                })
                if (isCheck && isCheck.length > 0) {
                    await db.schedules.bulkCreate(isCheck);
                    resolve({
                        err: 0,
                        mess: "da gui thanh cong"
                    })

                } else {
                    resolve({
                        err: 0,
                        mess: "da co"
                    })
                }

            } else {
                resolve({
                    err: 2,
                    mess: "chua gui gi len het"
                })
            }



        } catch (e) {
            reject(e)
        }
    })
}
let detailAppointmentDoctor = (date, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let findAppointment = await db.schedules.findAll({
                where: {
                    doctorid: id,
                    timestamp: date
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [
                    {
                        model: db.allcodes,
                    },

                ],
                raw: true,
                nest: true,
            })
            if (findAppointment && findAppointment.length > 0) {
                resolve({
                    err: 0,
                    mess: " thanh cong",
                    findAppointment
                })
            } else {
                resolve({
                    err: 2,
                    mess: "khong co data",
                })
            }


        } catch (e) {
            reject(e)
        }
    })

}

let saveMedicalSpecialtyHandle = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.image || !data.contentHTMLspecialties) {

                resolve({
                    err: 4,
                    mess: "thieu thong tin",
                    data
                })

            } else {
                await db.specialties.create({
                    name: data.name,
                    image: data.image,
                    contentHTMLspecialties: data.contentHTMLspecialties
                })
                resolve({
                    err: 0,
                    mess: "save successfully",
                    data
                })
            }


        } catch (e) {
            reject(e)
        }
    })
}
let saveRemoteConsultantHandle = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.image || !data.contentHTMLconsultants) {

                resolve({
                    err: 4,
                    mess: "thieu thong tin",
                    data
                })

            } else {
                await db.consultants.create({
                    name: data.name,
                    image: data.image,
                    contentHTMLconsultants: data.contentHTMLconsultants
                })
                resolve({
                    err: 0,
                    mess: "save successfully",
                    data
                })
            }


        } catch (e) {
            reject(e)
        }
    })
}

let allMedicalSpecialtyHandle = () => {
    return new Promise(async (resolve, reject) => {
        try {

            let data = await db.specialties.findAll({
                attributes: {
                    exclude: ['contentHTMLspecialties']
                },
            })
            if (data) {
                resolve({
                    err: 0,
                    mess: "load data specialty successfully",
                    data
                })
            } else {
                resolve({
                    err: 1,
                    mess: "load data specialty faile",
                    data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let allRConsultantHandle = () => {
    return new Promise(async (resolve, reject) => {
        try {

            let data = await db.consultants.findAll({
                attributes: {
                    exclude: ['contentHTMLconsultants']
                },
            })
            if (data) {
                resolve({
                    err: 0,
                    mess: "load data specialty successfully",
                    data
                })
            } else {
                resolve({
                    err: 1,
                    mess: "load data specialty faile",
                    data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let infoMSbyID = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // find speacialty in db by id
            let data = await db.specialties.findOne({
                where: {
                    id
                }
            })
            if (data) {

                resolve({
                    err: 0,
                    mess: "thanh cong",
                    data
                })
            } else {
                resolve({
                    err: 1,
                    mess: "failure",
                    data
                })
            }


        } catch (e) {
            reject(e);
        }
    })
}
let infoRCbyID = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // find speacialty in db by id
            let data = await db.consultants.findOne({
                where: {
                    id
                }
            })
            if (data) {

                resolve({
                    err: 0,
                    mess: "thanh cong",
                    data
                })
            } else {
                resolve({
                    err: 1,
                    mess: "failure",
                    data
                })
            }


        } catch (e) {
            reject(e);
        }
    })
}


let getDoctorInfo = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // find speacialty in db by id
            let data = await db.ckeditors.findAll({
                where: {
                    specialtyId: id,
                },
                attributes: ['doctorId'],
            })
            if (data) {

                resolve({
                    err: 0,
                    mess: "thanh cong",
                    data
                })
            } else {
                resolve({
                    err: 1,
                    mess: "failure",
                    data
                })
            }


        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getDetailDoctorId, getInfoDoctor, saveSchedule, detailAppointmentDoctor,
    saveMedicalSpecialtyHandle, allMedicalSpecialtyHandle, infoMSbyID, getDoctorInfo,
    saveRemoteConsultantHandle, allRConsultantHandle, infoRCbyID

}