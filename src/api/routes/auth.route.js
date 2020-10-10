const express = require('express');
const router = express.Router();
const { celebrate } = require('celebrate');

const authValidate = require('../../validations/auth.validate');
const authMiddleware = require('../middlewares/auth.middleware');
const authController = require('../../controllers/auth.controller');

router.route('/me').get(authMiddleware.ensureAuthMiddleware, authController.me);
router
  .route('/login')
  .post(celebrate({ body: authValidate.loginSchema }), authController.login);
router
  .route('/register')
  .post(
    celebrate({ body: authValidate.registerSchema }),
    authController.register
  );
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
