const express = require('express');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var router = express.Router();

const postController = require('../../controllers/post.controller');

router.post('/create', upload.single('postImage'), postController.create);
router.post('/:postId/like', postController.like);
router.post('/:postId/unlike', postController.unlike);
router.post('/:postId/comment', postController.comment);
router.get('/', postController.get);

module.exports = router;
