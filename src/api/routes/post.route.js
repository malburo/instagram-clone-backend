const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: './src/public/uploads/' });

const postController = require('../../controllers/post.controller');
const uploadValidate = require('../../validations/upload.validate');

router.post('/create', upload.single('postImage'), uploadValidate, postController.create);
router.post('/:postId/reaction', postController.reaction);
router.post('/:postId/comment', postController.comment);
router.get('/', postController.get);

module.exports = router;
