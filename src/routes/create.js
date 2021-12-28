const express = require('express');
const {create, store} = require('../controller/CreateController');
const router = express.Router();

router.post('/store', store);
router.get('/', create);


module.exports = router;