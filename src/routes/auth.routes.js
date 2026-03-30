const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const {
    validateRegister,
    validateLogin,
    validateChangePassword,
} = require('../middlewares/validation/auth.validation');

router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);
router.post('/change-password', validateChangePassword, authController.changePassword);

module.exports = router;