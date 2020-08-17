const express = require('express');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var router = express.Router();

const postController = require('../../controllers/post.controller');

router.get('/', postController.get);
router.post('/create', upload.single('postImage'), postController.create);
module.exports = router;
