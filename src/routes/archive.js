const express = require('express');
const router = express.Router();
const { archive } = require('../controller/ArchiveController')

router.get('/', archive);



module.exports = router;
