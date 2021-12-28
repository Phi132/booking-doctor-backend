const db = require('../models/index');
const { getDetailDoctorId, getInfoDoctor, saveSchedule, detailAppointmentDoctor,
    saveMedicalSpecialtyHandle, allMedicalSpecialtyHandle, infoMSbyID,
    getDoctorInfo, saveRemoteConsultantHandle, allRConsultantHandle, infoRCbyID
} = require('../service/doctorService');

class ApiDoctorController {
    //[GET] /api/get-detail-doctor-by-id
    detailDoctor = async (req, res) => {
        try {
            let dataDetailDoctor = await getDetailDoctorId(req.query.id);
            res.status(200).json({
                dataDetailDoctor
            })

        } catch (e) {
            res.status(200).json({
                err: -1,
                mess: 'lỗi doctor detail'
            })
            console.log("lỗi doctor detail", e);
        }
    }
    //[GET] /api/get-detail-doctor-allcodes-users
    dataInfoDoctor = async (req, res) => {
        try {
            let dataDetailDoctor = await getInfoDoctor(req.query.id);
            res.status(200).json({
                dataDetailDoctor
            })

        } catch (e) {
            res.status(200).json({
                err: -1,
                mess: 'lỗi data info doctor'
            })
            console.log("lỗi doctor info", e);
        }
    }
    //[POST] /api/save-schedule-appointment
    scheduleAppointment = async (req, res) => {
        try {
            
            let saveScheduleDoctor = await saveSchedule(req.body);
            res.status(200).json({
                saveScheduleDoctor
            })

        } catch (e) {
            res.status(200).json({
                err: -1,
                mess: 'lỗi khong luu schedule'
            })
            console.log("lỗi khong luu schedule", e);
        }
    }
    // [GET] /api/get-appointment-doctor
    detailAppointment = async (req, res) => {
        try {
            let detailAppointment = await detailAppointmentDoctor(req.query.date, req.query.id);
            res.status(200).json({
                detailAppointment
            })

        } catch (e) {
            res.status(200).json({
                err: -1,
                mess: 'lỗi load schedule'
            })
            console.log("lỗi load schedule", e);
        }
    }
    //[POST] /api/post-save-medical-specialty
    saveMedicalSpecialty = async (req, res) => {
        try {
            let responseMedicalSpecialty = await saveMedicalSpecialtyHandle(req.body);
            res.status(200).json({
                responseMedicalSpecialty
            })
        } catch (e) {
            res.status(200).json({
                err: -1,
                mess: 'lỗi khi lưu chuyên khoa'
            })
            console.log("lỗi khi lưu chuyên khoa", e);
        }
    }
    //[POST] /api/post-save-remote-consultant
    saveRemoteConsultant = async (req, res) => {
        try {
            let responseRemoteConsultant = await saveRemoteConsultantHandle(req.body);
            res.status(200).json({
                responseRemoteConsultant
            })
        } catch (e) {
            res.status(200).json({
                err: -1,
                mess: 'lỗi khi lưu tư vần từ xa'
            })
            console.log("lỗi khi lưu tư vần từ xa", e);
        }
    }
    //[GET] /api/all-data-medical-specialty
    allMedicalSpecialty = async (req, res) => {
        try {
            let dataAll = await allMedicalSpecialtyHandle();
            res.status(200).json({
                dataAll
            })

        } catch (e) {
            res.status(200).json({
                err: -1,
                mess: 'lỗi khi Load chuyên khoa'
            })
            console.log("lỗi khi Load chuyên khoa", e);
        }
    }
    // [GET] /api/all-data-remote-consultant
    allRemoteConsultant = async (req, res) => {
        try {
            let dataAll = await allRConsultantHandle();
            res.status(200).json({
                dataAll
            })

        } catch (e) {
            res.status(200).json({
                err: -1,
                mess: 'lỗi khi Load chuyên khoa'
            })
            console.log("lỗi khi Load chuyên khoa", e);
        }
    }
    // [GET] /api/medical-specialty-by-id
    dataSpecialtybyID = async (req, res) => {
        try {
            // infoMSbyID là thông tin specialty theo id
            let response = await infoMSbyID(req.params.id);
            res.status(200).json({
                response
            })

        } catch {
            res.status(200).json({
                err: -1,
                mess: 'lỗi khi Load chuyên khoa theo id'
            })
            console.log("lỗi khi Load chuyên khoa theo id", e);
        }
    }
    // [GET] /api/remote-consultant-by-id/:id

    dataConsultantbyID = async (req, res) => {
        try {
            // infoRCbyID là thông tin remote consultant theo id
            let response = await infoRCbyID(req.params.id);
            res.status(200).json({
                response
            })

        } catch {
            res.status(200).json({
                err: -1,
                mess: 'lỗi khi Load chuyên khoa theo id'
            })
            console.log("lỗi khi Load chuyên khoa theo id", e);
        }
    }
    //[GET] /api/doctorInfo-by-specialtyId
    doctorInfoBySpecialty = async (req, res) => {
        try {
            let response = await getDoctorInfo(req.query.id);
            res.status(200).json({
                response
            })
        } catch (e) {
            res.status(200).json({
                err: -1,
                mess: 'lỗi khi load doctorinfo theo chuyen khoa trong ckeditor'
            })
            console.log("lỗi khi load doctorinfo theo chuyen khoa trong ckeditor", e);
        }
    }
}
module.exports = new ApiDoctorController;