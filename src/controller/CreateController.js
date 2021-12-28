const express = require('express');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
const db = require('../models/index');


//[POST] /create/store
let store = (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPass = await hashPassUser(req.body.password)
            await db.Account_users.create({
                email: req.body.email,
                password: hashPass,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                address: req.body.address,
                phonenumber: req.body.phonenumber,
                positionid: req.body.positionid,
                //image: req.body.image,
                gender: req.body.gender,
                //roleid: req.body.roleid
            })
            res.redirect('/archive')
            resolve("tao thanh cong")
        } catch (e) {
            reject(e)
        }
    })

}

let hashPassUser = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hash = await bcrypt.hashSync(password, salt);
            resolve(hash)
        } catch (e) {
            reject(e)
        }
    })
}
//[GET] /create
let create = (req, res) => {
    try {
        res.render('Create.ejs');
    } catch (e) {
        console.log(e)
    }
}




module.exports = { create, store };
