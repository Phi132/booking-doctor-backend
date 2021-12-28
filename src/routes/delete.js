const express = require('express');
const router = express.Router();
const { deleteUser } = require('../controller/DeleteController');


router.get('/destroy', deleteUser);


module.exports = router;
