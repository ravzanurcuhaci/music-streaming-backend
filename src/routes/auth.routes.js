const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middlewares');
const { validateUserId,
    validateRegister,
    validateLogin,
    validateChangePassword,
} = require('../middlewares/validation/auth.validation');

router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);
router.post('/change-password', authMiddleware, validateChangePassword, authController.changePassword);
router.get('/:id', authMiddleware, validateUserId, authController.getUserDetail);
router.put('/:id', authMiddleware, validateUserId, authController.updateUser);
router.get('/:id/playlists', authMiddleware, validateUserId, authController.getUserPlaylists);
router.get('/:id/listening-history', authMiddleware, validateUserId, authController.getUserListiningHistory);
router.delete('/me', authMiddleware, authController.deleteUser);
module.exports = router;