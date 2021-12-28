const express = require('express');
const db = require('../models/index');


//[POST] /edit/update
let update = (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataId = await db.Account_users.findOne({
                where: { id: req.query.id }
            })
            if (dataId) {
                dataId.email = req.body.email;
                dataId.firstName = req.body.firstName;
                dataId.lastName = req.body.lastName;
                dataId.address = req.body.address;
                dataId.phonenumber = req.body.phonenumber;
                dataId.gender = req.body.gender;

                await dataId.save();
                res.redirect('/archive');
                resolve();
            }
            else {
                resolve();
            }


        } catch (e) {
            reject(e)
        }
    })
}

//[GET] /edit
let edit = (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataId = await db.Account_users.findOne({
                where: { id: req.query.id }
            })
            if (dataId) {
                res.render('Edit.ejs', {
                    data: dataId
                })
                resolve();
            }
            else {
                console.log("not found");
                resolve();

            }


        } catch (e) {
            reject(e)
        }
    })

}



module.exports = { edit, update };
