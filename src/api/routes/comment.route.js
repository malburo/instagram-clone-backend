const express = require('express');
const router = express.Router();

const controller = require('../src/api/controllers/comment.controller');

router.post('/create', controller.create);
module.exports = router;
