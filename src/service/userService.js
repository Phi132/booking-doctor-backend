const db = require('../models/index');
const bcrypt = require('bcryptjs');
const { use } = require('../routes/home');

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let useData = {};
            let isCheckUserEmail = await checkUserEmail(email);
            if (isCheckUserEmail) {
                let isUser = await db.Account_users.findOne({
                    where: { email: email },
                    raw: true
                })
                if (isUser) {
                    let isCorrectPass = await bcrypt.compareSync(password, isUser.password);
                    if (isCorrectPass) {
                        useData.err = 0;
                        useData.mess = "mat khau dung";
                        useData.email = isUser.email;
                        useData.roleid = isUser.roleid;
                        useData.firstName = isUser.firstName;
                        useData.password = isUser.password;
                        delete useData.password;
                        resolve({
                            err: 0,
                            mess: "dang nhap thanh cong",
                            roleid: isUser.roleid,
                            firstName : isUser.firstName,
                        })
                    }
                    else {
                        useData.err = 3;
                        useData.mess = "mat khau sai";
                    }
                } else {
                    useData.err = 2;
                    useData.mess = "Ban Chua Tao Tai Khoan nay";
                }
            }
            else {
                useData.err = 4;
                useData.mess = "Ban Chua Tao Tai Khoan nay";
            }
            resolve(useData);
        } catch (e) {
            console.log("loi o day", e);
            reject(e);

        }
    });
}
let checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isEmail = db.Account_users.findOne({
                where: { email: email }
            })
            if (isEmail) {
                resolve(isEmail)
            } else {
                console.log("khong co email nay");
            }

        } catch (e) {
            reject(e);
        }
    });
}

let getDataAllCode = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let AllCode = {};
            let data = await db.allcodes.findAll({
                where: { type: typeInput },
                raw: true
            })
            if (data) {

                AllCode = data;
                resolve({
                    AllCode,
                    err: 0
                });
            } else {
                resolve({
                    mess: "khong tim thay type do",
                    err: 1
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = { handleUserLogin, getDataAllCode };