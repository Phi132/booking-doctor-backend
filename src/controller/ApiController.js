const db = require('../models/index');
const { handleUserLogin, getDataAllCode } = require('../service/userService');
const { createUser, deleteUserData, editUserData,
    getDataDoctorLimit, getAllDataDoctors, saveInfoDetailDoctor,
    storeInfoDetailDoctor, getAllDataSpecialty
} = require('../service/ApiCRUD');

//[POST] /api/login
let login = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;


    if (!email || !password) {
        res.status(200).json({
            error: 1,
            mess: "vui long nhap email hoac password"
        })
    } else {
        let userData = await handleUserLogin(email, password);
        res.status(200).json({
            error: userData.err,
            mess: userData.mess,
            userData
        })
    }
}

//[GET] /api/allcode
let allcode = async (req, res) => {
    let typeInput = req.query.type;
    if (!typeInput) {
        res.status(200).json({
            AllCodeErr: 1,
            AllCodeMess: "Moi nhap type can tim"
        })
    } else {
        let allCodeData = await getDataAllCode(typeInput);
        res.status(200).json({
            AllCodeErr: allCodeData.err,
            allCodeData
        })
    }
}

//[get] /api/get-data
let getData = async (req, res) => {
    let data = await db.Account_users.findAll();
    if (data) {
        res.status(200).json({
            error: 0,
            data
        })
    } else {
        res.status(200).json({
            error: 5,
            mess: "Khong co du lieu trong db"
        })
    }
}
//[POST] /api/create-data
let createData = async (req, res) => {
    let createData = await createUser(req.body);
    return res.status(200).json(createData);


}
//[POST] /api/deleteUser
let deleteUser = async (req, res) => {
    let deleteUser = await deleteUserData(req.body.id);
    return res.status(200).json(deleteUser);
}
//[PUT] /api/updateDataUser
let editUser = async (req, res) => {
    let editUserDataa = await editUserData(req.body);
    return res.status(200).json(editUserDataa)
}
//[GET] /api/get-data-doctor-limit
let getDoctorLimit = async (req, res) => {
    let limit = req.query.limit;
    let roleId = req.query.roleId;
    if (!limit) {
        limit = 5;
    }
    let getData = await getDataDoctorLimit(+limit, roleId);
    return res.status(200).json(getData)
}

//[GET] api/get-all-doctors
let getAllDoctors = async (req, res) => {
    try {
        let dataDoctor = await getAllDataDoctors();
        res.status(200).json(dataDoctor);

    } catch (e) {
        res.status(200).json({
            err: 1,
            mess: "có lỗi khi lấy all doctor"
        })
    }
}
// [GET] api/get-all-specialty
let getAllSpecialty = async (req, res) => {
    try {
        let dataSpecialty = await getAllDataSpecialty();
        res.status(200).json(dataSpecialty);
    } catch (e) {
        res.status(200).json({
            err: 1,
            mess: "có lỗi khi lấy all specialty"
        })
    }
}
//[POST] api/save-info-doctor
let saveInfoDoctor = async (req, res) => {
    try {
        let saveDoctor = await saveInfoDetailDoctor(req.body);
        res.status(200).json(saveDoctor);

    } catch (e) {
        console.log(e)
        res.status(200).json({
            err: 1,
            mess: "có lỗi khi lưu doctor"
        })
    }
}
//[PUT] /api/store-info-doctor
let storeInfoDoctor = async (req, res) => {
    try {
        //console.log(req.body.contentHTML[0]);
        let storeDoctor = await storeInfoDetailDoctor(req.body);
        res.status(200).json(storeDoctor);

    } catch (e) {
        console.log(e)
        res.status(200).json({
            err: 1,
            mess: "có lỗi khi lưu doctor"
        })
    }
}

module.exports = {
    login, allcode, getData, createData,
    deleteUser, editUser, getDoctorLimit, getAllDoctors,
    saveInfoDoctor, storeInfoDoctor, getAllSpecialty,

};
