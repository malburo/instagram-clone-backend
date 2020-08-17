const express = require('express');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var router = express.Router();

const controller = require('../src/api/controllers/post.controller');

router.get('/', controller.get);
router.post('/create', upload.single('postImage'), controller.create);
module.exports = router;
