const express = require('express');
const router = express.Router();
const { celebrate } = require('celebrate');

const authController = require('../../controllers/auth.controller');
const authValidate = require('../../validations/auth.validate');

const { ensureAuthMiddleware } = require('../middlewares/auth.middleware');

router.route('/me').get(ensureAuthMiddleware, authController.me);
router
  .route('/login')
  .post(celebrate({ body: authValidate.loginSchema }), authController.login);
router
  .route('/register')
  .post(celebrate({ body: authValidate.registerSchema }), authController.register);
router
  .route('/reset')
  .post(
    celebrate({ body: authValidate.resetPasswordSchema }),
    authController.resetPassword
  );
router
  .route('/reset/:token')
  .get(authController.verifyMailResetPassword)
  .post(authController.newPassword);

module.exports = router;
