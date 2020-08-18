const express = require('express');
const router = express.Router();

const authController = require('../../controllers/auth.controller');

const validateLogin = require('../middlewares/validations/validateLogin');
const validateRegister = require('../middlewares/validations/validateRegister');
const { ensureAuthMiddleware } = require('../middlewares/auth.middleware');

router.post('/login', validateLogin, authController.login);
router.post('/register', validateRegister, authController.register);
router.post('/reset', authController.reset);
router.get('/', ensureAuthMiddleware, authController.checkToken);

module.exports = router;
