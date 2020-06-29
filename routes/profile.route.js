const express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

const controller = require('../controllers/profile.controller');

router.get('/:username/posts', controller.getPosts);
router.post('/avatar', upload.single('avatar'), controller.changeAvatar);
module.exports = router;
