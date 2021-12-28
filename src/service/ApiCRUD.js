const db = require('../models/index');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

let createUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPass = await handleHashPass(data.password);
            let isEmail = await data.email;
            await db.Users.create({
                email: data.email,
                password: hashPass,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                positionid: data.positionid,
                gender: data.gender,
                roleid: data.roleid,
                image: data.image
            })
            resolve({
                err: 0,
                mess: "Create Successfully"
            });




        }
        catch (e) {
            reject(e);
        }
    })

}
let handleHashPass = (password) => {
    return new Promise(async (resolve, reject) => {
        try {

            let hash = await bcrypt.hashSync(password, salt);
            resolve(hash)

        }
        catch (e) {
            reject(e);
        }
    })
}
// delete user
let deleteUserData = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isCheckIdUser = await db.Users.findOne({
                where: { id: id }
            })
            if (isCheckIdUser) {
                await isCheckIdUser.destroy();
                resolve({
                    err: 0,
                    mess: "Xóa thành công"
                })
            } else {
                resolve({
                    err: 1,
                    mess: "Không tìm thấy user này"
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}
// update user
let editUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.id || !data.roleid || !data.gender || !data.positionid) {
                resolve({
                    err: 2,
                    mess: "thiếu id, gender, role, position"
                })
            }
            let isCheckUpdateUser = await db.Users.findOne({
                where: { id: data.id }
            })
            if (isCheckUpdateUser) {
                isCheckUpdateUser.email = data.email;
                isCheckUpdateUser.firstName = data.firstName;
                isCheckUpdateUser.lastName = data.lastName;
                isCheckUpdateUser.address = data.address;
                isCheckUpdateUser.phonenumber = data.phonenumber;
                isCheckUpdateUser.positionid = data.positionid;
                isCheckUpdateUser.gender = data.gender;
                isCheckUpdateUser.roleid = data.roleid;
                isCheckUpdateUser.image = data.image;

                await isCheckUpdateUser.save();
                resolve({
                    err: 0,
                    mess: "edit thành công"
                })
            } else {
                resolve({
                    err: 1,
                    mess: "edit thất bại"
                })
            }


        } catch (e) {
            reject(e)
        }
    })
}
// get data doctor with limit
let getDataDoctorLimit = (limit, roleId) => {
    return new Promise(async (resolve, reject) => {
        try {


            let dataDoctor = await db.Users.findAll({
                limit: limit,
                where: { roleid: roleId },
                order: [['createdAt', 'DESC'],],
                attributes: {
                    exclude: ['password']
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
            if (dataDoctor) {
                resolve({
                    err: 0,
                    mess: "in ra thanh cong",
                    dataDoctor
                })
            } else {
                resolve({
                    err: 1,
                    mess: "in ra that bai"
                })
            }




        } catch (e) {
            console.log("Loi get data doctor with limit", e);
        }

    })

}
let getAllDataDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataDoctor = await db.Users.findAll({
                where: { roleid: 'R2' },
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
let getAllDataSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataSpecialty = await db.specialties.findAll({
                attributes: {
                    exclude: ['contentHTMLspecialties', 'image']
                },

            })
            if (dataSpecialty) {
                resolve({
                    err: 0,
                    mess: "lay ra thanh cong",
                    dataSpecialty
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
let saveInfoDetailDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.doctorId || !data.contentHTML) {
                resolve({
                    err: 2,
                    mess: "thiếu id, gender, role, position"
                })
            }
            await db.ckeditors.create({
                contentHTML: data.contentHTML,
                description: data.description,
                doctorId: data.doctorId,
                specialtyId: data.specialtyId,

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
let storeInfoDetailDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.contentHTML) {
                resolve({
                    err: 2,
                    mess: "thiếu contentHTML"
                })
            }
            let isCheckUpdateUser = await db.ckeditors.findOne({
                where: { doctorId: data.doctorId },

            })
            //console.log(data.contentHTML[0]);
            if (isCheckUpdateUser) {

                isCheckUpdateUser.contentHTML = data.contentHTML;
                isCheckUpdateUser.description = data.description;
                isCheckUpdateUser.specialtyId = data.specialtyId;

                await isCheckUpdateUser.save();
                resolve({
                    err: 0,
                    mess: "save success"
                })

            } else {
                resolve({
                    err: 1,
                    mess: "save faile"
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

module.exports = {
    createUser, deleteUserData,
    editUserData, getDataDoctorLimit, getAllDataDoctors,
    saveInfoDetailDoctor, storeInfoDetailDoctor, getAllDataSpecialty
};
