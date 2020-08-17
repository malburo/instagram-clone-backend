const express = require('express');
var router = express.Router();

const controller = require('../src/api/controllers/auth.controller');

const validateLogin = require('../src/api/middlewares/validations/validateLogin');
const validateRegister = require('../src/api/middlewares/validations/validateRegister');
const { ensureAuthMiddleware } = require('../src/api/middlewares/auth.middleware');

router.get('/', ensureAuthMiddleware, controller.checkToken);
router.post('/login', validateLogin, controller.login);
router.post('/register', validateRegister, controller.register);
router.post('/reset', controller.reset);

module.exports = router;
