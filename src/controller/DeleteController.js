const express = require('express');
const db = require('../models/index');


//[POST] /delete/destroy
let deleteUser = (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataId = await db.Users.findOne({
                where: { id: req.query.id }
            })
            if (dataId) {
                
                await dataId.destroy();
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

module.exports = { deleteUser };
