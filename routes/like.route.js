const express = require('express');
var router = express.Router();

const controller = require('../controllers/like.controller');

router.post('/like', controller.like);
router.post('/unlike', controller.unlike);
module.exports = router;