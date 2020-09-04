const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = require('../../configs/multer.config');

const postController = require('../../controllers/post.controller');
const uploadValidate = require('../../validations/upload.validate');

router.post(
  '/create',
  upload.array('files'),
  uploadValidate,
  postController.create
);
router.post('/:postId/reaction', postController.reaction);
router.post('/:postId/comment', postController.comment);
router.get('/', postController.getPostByLimit);

module.exports = router;
