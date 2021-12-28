const db = require('../models/index');
const consultantService = require('../service/consultantService');

class ApiConsultantController {
    //[Get] /api/get-all-consultant
    getAllConsultant = async (req, res) => {
        try {
            let dataDoctor = await consultantService.getAllDataConsultant();
            res.status(200).json(dataDoctor);

        } catch (e) {
            res.status(200).json({
                err: 1,
                mess: "có lỗi khi lấy all doctor"
            })
        }
    }
    //[POST] /api/save-info-consultant
    saveInfoConsultant = async (req, res) => {
        try {
            let response = await consultantService.saveInfoConsultant(req.body);
            res.status(200).json({
                response
            })
        } catch (e) {
            res.status(200).json({
                err: -1,
                mess: 'lỗi khi lưu data user tư vấn'
            })
            console.log("lỗi khi lưu data user tư vấn", e);
        }
    }
    //[PUT] /api/store-info-consultant
    storeInfoConsultant = async (req, res) => {
        try {
            //console.log(req.body.contentHTML[0]);
            let storeConsultant = await consultantService.storeInfoDetailConsultant(req.body);
            res.status(200).json(storeConsultant);

        } catch (e) {
            console.log(e)
            res.status(200).json({
                err: 1,
                mess: "có lỗi khi lưu Consultant"
            })
        }
    }

    //[GET] /api/get-type-consultant-by-id
    typeConsultantById = async (req, res) => {

        try {
            let typeConsultant = await consultantService.getTypeConsultantById(+req.query.doctorId);
            res.status(200).json({
                typeConsultant
            })

        } catch (e) {
            res.status(200).json({
                err: -1,
                mess: 'lỗi doctor detail'
            })
            console.log("lỗi doctor detail", e);
        }
    }
    //[POST] /api//create-profile-consultant
    createProfileConsultant = async (req, res) => {
        try {
            let responese = await consultantService.createProfileConsultantHandle(req.body);
            res.status(200).json({
                responese
            })
        } catch (e) {
            console.log("loi khi create new profile consultant");
        }
    }
    //[POST] /api//update-profile-consultant
    updateProfileConsultant = async (req, res) => {
        try {
            let responese = await consultantService.updateProfileConsultantHandle(req.body);
            res.status(200).json({
                responese
            })

        } catch (e) {
            console.log("co loi khi update profile consultant");
        }
    }
    //[GET] /api/get-all-type-consultant
    allTypeConsultant = async (req, res) => {
        try {
            let responese = await consultantService.allTypeConsultantConsultant();
            res.status(200).json({
                responese
            })

        } catch (e) {
            console.log("co loi khi get all type consultant");
        }
    }
    //[GET] /api/userByIdConsultant
    userByIdConsultant = async (req, res) => {
        try {
            let responese = await consultantService.userByIdConsultantHandle(+req.query.consultantId);
            res.status(200).json({
                responese
            })

        } catch (e) {
            console.log("co loi khi get all type consultant");
        }
    }
    // [GET] /api/get-profile-user-by-doctorId
    profileUserConsultant = async (req, res) => {
        try {
            let responese = await consultantService.profileUserConsultantHandle(+req.query.doctorId);
            res.status(200).json({
                responese
            })


        } catch (e) {
            console.log(e);
        }
    }

}
module.exports = new ApiConsultantController;