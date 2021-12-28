const express = require('express');
const router = express.Router();
const { edit, update } = require('../controller/EditController');


router.post('/update-data', update)
router.get('/', edit);


module.exports = router;
