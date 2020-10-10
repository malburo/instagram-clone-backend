const express = require('express');
const router = express.Router();

const accountController = require('../../controllers/account.controller');

router.route('/edit').post(accountController.editProfile);
router.route('/password/change').post(accountController.changePassword);

module.exports = router;
