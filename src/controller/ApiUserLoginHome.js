const db = require('../models/index');
const { checkLoginUserHome } = require('../service/loginUserService');

class ApiUserLoginHome {

    //[POST] /api/login-user
    loginUserHome = async (req, res) => {
        try {
            
            if (!req.body.email || !req.body.password) {
                res.status(200).json({
                    err: 4,
                    mess: 'Thieu email hoac password'
                })
            } else {
                let checkLoginUserHomea = await checkLoginUserHome(req.body.email, req.body.password);
                res.status(200).json({
                    checkLoginUserHomea
                })
            }


        } catch (e) {
            res.status(200).json({
                err: -1,
                mess: 'lỗi khong Gửi data'
            })
            console.log("lỗi khong gui email password", e);
        }
    }
}
module.exports = new ApiUserLoginHome;