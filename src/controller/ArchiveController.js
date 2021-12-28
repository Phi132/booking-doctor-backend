const db = require('../models/index');

let archive = (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Account_users.findAll({
                raw: true,
            })

            res.render("Archive.ejs", {
                dataUser: data
            });
            resolve("in thanh cong")
        } catch (e) {
            reject(e)
        }

    })

}


module.exports = { archive };
