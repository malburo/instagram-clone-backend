const express = require('express');
var router = express.Router();

const likeController = require('../../controllers/like.controller');

router.post('/like', likeController.like);
router.post('/unlike', likeController.unlike);
module.exports = router;
