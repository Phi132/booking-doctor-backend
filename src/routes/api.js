const express = require('express');
const router = express.Router();
const { login, allcode, getData, createData,
    deleteUser, editUser, getDoctorLimit, getAllDoctors,
    saveInfoDoctor, storeInfoDoctor, getAllSpecialty

} = require('../controller/ApiController');
const ApiDoctorController = require('../controller/ApiDoctorController');
const ApiUserLoginHome = require('../controller/ApiUserLoginHome');
const PatientController = require('../controller/PatientController');
const ConsultantController = require('../controller/ApiConsultantController');

router.post('/login', login);
// get all data by input type
router.get('/allcode', allcode);
// api reactjs
router.get('/get-data', getData);
router.post('/create-data', createData);
// api delete
router.post('/deleteUser', deleteUser);
// api edit
router.put('/updateDataUser', editUser);
// api get data with limit
router.get('/get-data-doctor-limit', getDoctorLimit);
// api get all doctor data
router.get('/get-all-doctors', getAllDoctors);
// get all specialty
router.get('/get-all-specialty', getAllSpecialty);
//create data doctor ckeditor
router.post('/save-info-doctor', saveInfoDoctor);
// save data doctor ckeditor
router.put('/store-info-doctor', storeInfoDoctor);
// get detail doctor
router.get('/get-detail-doctor-by-id', ApiDoctorController.detailDoctor);
// get doctor join allcode and user
router.get('/get-detail-doctor-allcodes-users', ApiDoctorController.dataInfoDoctor);
// save detail appointment
router.post('/save-schedule-appointment', ApiDoctorController.scheduleAppointment);
// get detail appointment each doctor with id
router.get('/get-appointment-doctor', ApiDoctorController.detailAppointment);

// ------------medical specialty----------------
// save medical specialty
router.post('/post-save-medical-specialty', ApiDoctorController.saveMedicalSpecialty);
// save remote consultant
router.post('/post-save-remote-consultant', ApiDoctorController.saveRemoteConsultant);
// get all medical specialty
router.get('/all-data-medical-specialty', ApiDoctorController.allMedicalSpecialty);

// get medical specialty by id
router.get('/medical-specialty-by-id/:id', ApiDoctorController.dataSpecialtybyID);
// get remote consultant by id 
router.get('/remote-consultant-by-id/:id', ApiDoctorController.dataConsultantbyID);
// get doctor info by speacilty id in ckeditor
router.get('/doctorInfo-by-specialtyId', ApiDoctorController.doctorInfoBySpecialty)
// pataint login
router.post('/login-user', ApiUserLoginHome.loginUserHome);

//  -------------------- Patient ------------------
// submit infor patient 
router.post('/submit-info-patient', PatientController.submitInfoPatient);

// response email for customer
router.post('/send-email-to-patient', PatientController.sendEmailToPatient);
// verify appointment 
router.get('/verify-token-appointment', PatientController.verifyAppointment);

//  ------------------- Consultant ----------------
// get all type remote consultant
router.get('/all-data-remote-consultant', ApiDoctorController.allRemoteConsultant);
// api get all data user consultant
router.get('/get-all-consultant', ConsultantController.getAllConsultant);
//create data consultant ckeditor
router.post('/save-info-consultant', ConsultantController.saveInfoConsultant);
// save data consultant ckeditor
router.put('/store-info-consultant', ConsultantController.storeInfoConsultant);
// get detail consultant

// get type consultant by id
router.get('/get-type-consultant-by-id', ConsultantController.typeConsultantById)
// create new profle consultant
router.post('/create-profile-consultant', ConsultantController.createProfileConsultant);
// updata profile consultant
router.put('/update-profile-consultant', ConsultantController.updateProfileConsultant);
// get all consultant
router.get('/get-all-type-consultant', ConsultantController.allTypeConsultant);
// get user consultant by id type consultant
router.get('/get-user-by-id-consultant', ConsultantController.userByIdConsultant);
// get profile user by doctor id
router.get('/get-profile-user-by-doctorId', ConsultantController.profileUserConsultant)


module.exports = router;
