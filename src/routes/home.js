const express = require('express');
const router = express.Router();

const {homePage} = require('../controller/HomeController')


router.use('/', homePage);

module.exports = router;