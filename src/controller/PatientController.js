const db = require('../models/index');
const { submitInfoPatientHandle, nodeMailer, verify } = require('../service/patientService');

class PatientController {

    //[POST] /api/submit-info-patient
    submitInfoPatient = async (req, res) => {
        try {

            let submit = await submitInfoPatientHandle(req.body);

            res.status(200).json({
                submit
            })



        } catch (e) {
            res.status(200).json({
                err: -1,
                mess: 'lỗi khong Gửi data'
            })
            console.log("lỗi khong gui email password", e);
        }
    }
    //[POST] /api/send-email-to-patient
    sendEmailToPatient = async (req, res) => {

        try {

            let submit = await nodeMailer(req.body);

            res.status(200).json({
                submit
            })

        } catch (e) {
            res.status(200).json({
                err: -1,
                mess: 'lỗi khong Gửi data'
            })
            console.log("lỗi khong gui email nguoi dung", e);
        }
    }
    //[GET] /verify-token-appointment
    verifyAppointment = async (req, res) => {
        try {
            
            let verifyy = await verify(req.query);
            res.render("SuccessConfirm.ejs");

            // res.status(200).json({
            //     verifyy
            // });
            

        } catch (e) {
            res.status(200).json({
                err: -1,
                mess: 'lỗi khong Gửi data'
            })
            console.log("loi xac nhan appointment", e);
        }
    }
}
module.exports = new PatientController;