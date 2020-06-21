const express = require('express');
var router = express.Router();

const controller = require('../controllers/auth.controller');
const validateLogin = require('../middlewares/validations/validateLogin');
const validateRegister = require('../middlewares/validations/validateRegister');

router.post('/login', validateLogin, controller.login);
router.post('/register', validateRegister, controller.register);
router.post('/reset', controller.reset);
module.exports = router;
