const db = require('../models/index');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const { reject } = require('lodash');
require('dotenv').config();

const MAX_NUMBER = process.env.MAX_NUMBER;

class consultantService {
    getAllDataConsultant = () => {
        return new Promise(async (resolve, reject) => {
            try {
                let dataDoctor = await db.Users.findAll({
                    where: { roleid: 'R4' },
                    attributes: {
                        exclude: ['password', 'image']
                    },

                })
                if (dataDoctor) {
                    resolve({
                        err: 0,
                        mess: "lay ra thanh cong",
                        dataDoctor
                    })
                } else {
                    resolve({
                        err: 2,
                        mess: "Lay Tat Ca Doctors That Bai"
                    })
                }

            } catch (e) {
                reject(e);
            }
        })
    }
    saveInfoConsultant = (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.doctorId || !data.contentHTML) {
                    resolve({
                        err: 2,
                        mess: "thiếu id, gender, role, position"
                    })
                }
                await db.ckeditor_consultants.create({
                    contentHTML: data.contentHTML,
                    description: data.description,
                    doctorId: data.doctorId,
                    consultantId: data.consultantId,

                })
                resolve({
                    err: 0,
                    mess: "save thành công"
                })


            } catch (e) {
                reject(e);
            }
        })
    }
    storeInfoDetailConsultant = (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.contentHTML) {
                    resolve({
                        err: 2,
                        mess: "thiếu contentHTML"
                    })
                }
                let isCheckUpdateUser = await db.ckeditor_consultants.findOne({
                    where: { doctorId: data.doctorId },

                })
                //console.log(data.contentHTML[0]);
                if (isCheckUpdateUser) {

                    isCheckUpdateUser.contentHTML = data.contentHTML;
                    isCheckUpdateUser.description = data.description;
                    isCheckUpdateUser.consultantId = data.consultantId;

                    await isCheckUpdateUser.save();
                    resolve({
                        err: 0,
                        mess: "save success"
                    })

                } else {
                    resolve({
                        err: 1,
                        mess: "save failure"
                    })
                }

                resolve({
                    err: 0,
                    mess: "save thành công"
                })


            } catch (e) {
                reject(e);
            }
        })
    }

    getTypeConsultantById = (doctorId) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (!doctorId) {
                    resolve({
                        err: 2,
                        mess: "chưa truyền id"
                    })
                }
                let dataDetail = await db.ckeditor_consultants.findOne({
                    where: { doctorId: doctorId },
                    include: [
                        {
                            model: db.consultants,
                            attributes: ['name', 'id']
                        },
                    ],
                    raw: false,
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
                        err: 4,
                        mess: "khong tim thay"
                    })
                }

            } catch (e) {
                reject(e)
            }
        })
    }
    createProfileConsultantHandle = (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.contentHTML || !data.description || !data.consultantId) {
                    resolve({
                        err: 4,
                        mess: "thiếu tham số gòi"
                    })
                } else {
                    await db.ckeditor_consultants.create({
                        contentHTML: data.contentHTML,
                        description: data.description,
                        doctorId: data.doctorId,
                        consultantId: data.consultantId,
                    })
                    resolve({
                        err: 0,
                        mess: "save profile consultant thành công"
                    })
                }

            } catch (e) {
                console.log("e");
            }
        })
    }
    updateProfileConsultantHandle = (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.contentHTML || !data.description || !data.consultantId) {
                    resolve({
                        err: 4,
                        mess: "thiếu tham số gòi",
                        data
                    })
                } else {
                    let dataOld = await db.ckeditor_consultants.findOne({
                        where: { doctorId: data.doctorId }
                    });
                    if (dataOld) {
                        dataOld.contentHTML = data.contentHTML;
                        dataOld.description = data.description;
                        dataOld.consultantId = data.consultantId;
                        await dataOld.save();
                        resolve({
                            err: 0,
                            mess: "update profile consultant thành công"
                        })
                    } else {
                        resolve({
                            err: 1,
                            mess: "khong tim thay data cũ"
                        })
                    }

                }

            } catch (e) {
                console.log(e);
                reject(e)
            }
        })
    }
    allTypeConsultantConsultant = () => {
        return new Promise(async (resolve, reject) => {
            try {
                let dbConsultant = await db.consultants.findAll({
                    attributes: {
                        exclude: ['contentHTMLconsultants', 'image', 'createdAt', 'updatedAt']
                    },
                })
                if (dbConsultant) {
                    resolve({
                        err: 0,
                        mess: "thanh cong",
                        dbConsultant
                    })
                } else {
                    resolve({
                        err: 1,
                        mess: "that bai",
                    })
                }

            } catch (e) {
                console.log("co loi khi load all type consultant", e);
                reject(e);
            }
        })
    }
    userByIdConsultantHandle = (consultantId) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (!consultantId) {
                    resolve({
                        err: 1,
                        mess: "missing consultantId parament"
                    })
                } else {
                    let user = await db.ckeditor_consultants.findAll({
                        where: {
                            consultantId
                        }
                    });
                    if (user && user.length > 0) {
                        resolve({
                            err: 0,
                            mess: "load user consultant by id consultant successful",
                            user,
                        });
                    } else {
                        resolve({
                            err: 5,
                            mess: "load user consultant by id consultant failure",
                            user
                        });
                    }
                }

            } catch (e) {
                reject(e)
            }
        })
    }
    profileUserConsultantHandle = (doctorId) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (!doctorId) {
                    resolve({
                        err: 2,
                        mess: "missing docotrId"
                    })
                } else {
                    let data = await db.ckeditor_consultants.findOne({
                        where: { doctorId },
                        include: [
                            {
                                model: await db.Users,
                                attributes: ['firstName', 'lastName', 'image']
                            }
                        ],
                        raw: true,
                        // nest có tác dụng đổi positionData.valueVi thành 
                        // thành object positionData{.....}
                        nest: true,
                    })
                    if (data) {
                        resolve({
                            err: 0,
                            mess: "thanh cong",
                            data
                        })
                    } else {
                        resolve({
                            err: 6,
                            mess: "that bai"
                        })
                    }
                }

            } catch (e) {
                reject(e)
            }
        })
    }
}


module.exports = new consultantService;