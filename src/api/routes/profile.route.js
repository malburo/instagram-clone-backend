const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: './src/public/uploads/' });

const profileController = require('../../controllers/profile.controller');
const paramsMiddleware = require('../middlewares/params.middleware');
const uploadValidate = require('../../validations/upload.validate');

router
  .route('/:username')
  .get(paramsMiddleware.username, profileController.getProfile);
router
  .route('/:username/change-avatar')
  .post(
    upload.single('avatar'),
    uploadValidate,
    profileController.changeAvatar
  );

module.exports = router;
