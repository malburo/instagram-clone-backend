const express = require('express');
const router = express.Router();

const authController = require('../../controllers/auth.controller');

const validateLogin = require('../../validations/login.validate');
const validateRegister = require('../../validations/register.validate');
const validateResetPassword = require('../../validations/resetPassword.validate');
const { ensureAuthMiddleware } = require('../middlewares/auth.middleware');

router.get('/me', ensureAuthMiddleware, authController.me);
router.post('/login', validateLogin, authController.login);
router.post('/register', validateRegister, authController.register);
router.post('/reset', validateResetPassword, authController.resetPassword);
router.post('/reset/:token', authController.newPassword);
router.get('/reset/:token', authController.verifyMailResetPassword);

module.exports = router;
