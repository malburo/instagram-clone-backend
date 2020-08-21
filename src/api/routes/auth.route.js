const express = require('express');
const router = express.Router();

const authController = require('../../controllers/auth.controller');

const validateLogin = require('../../validations/login.validate');
const validateRegister = require('../../validations/register.validate');
const { ensureAuthMiddleware } = require('../middlewares/auth.middleware');

router.post('/login', validateLogin, authController.login);
router.post('/register', validateRegister, authController.register);
router.post('/reset', authController.reset);
router.get('/', ensureAuthMiddleware, authController.checkToken);

module.exports = router;
