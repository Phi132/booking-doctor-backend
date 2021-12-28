const db = require('../models/index');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

let checkLoginUserHome = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {

            let useData = {};
            let isCheckUserEmail = await isCheckEmail(email);
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
                            mess: "dang nhap thanh cong patient ",
                            id: isUser.id,
                            roleid: isUser.roleid,
                            firstName: isUser.firstName,
                            lastName: isUser.lastName
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
            reject(e);
        }

    })
}
let isCheckEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isEmail = await db.Account_users.findOne({
                where: { email }
            })
            if (isEmail) {
                resolve(isEmail)
            } else {
                resolve({
                    err: 1,
                    mess: "email này khong ton tai"
                })
            }

        } catch (e) {
            console.log("loi check email", e);
        }
    })
}

module.exports = { checkLoginUserHome }