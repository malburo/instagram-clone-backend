const express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

const profileController = require('../../controllers/profile.controller');

router.get('/:username', profileController.getPosts);
router.post(
  '/:username/change-avatar',
  upload.single('avatar'),
  profileController.changeAvatar
);

module.exports = router;
