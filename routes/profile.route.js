const express = require('express');
var router = express.Router();

const controller = require('../controllers/profile.controller');

router.get('/', controller.get);
module.exports = router;
