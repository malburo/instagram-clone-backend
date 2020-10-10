const express = require('express');
const router = express.Router();

const upload = require('../../configs/multer.config');

const postController = require('../../controllers/post.controller');
const uploadValidate = require('../../validations/upload.validate');

router
  .route('/create')
  .post(upload.array('files'), uploadValidate, postController.create);
router
  .route('/:postId/reaction')
  .post(postController.reaction);
router
  .route('/:postId/comment')
  .post(postController.comment);
router
  .route('/')
  .get(postController.getPostByLimit);

module.exports = router;
