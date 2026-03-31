const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album.controller');
const authMiddleware = require('../middlewares/auth.middlewares');
const {
    validateAlbumId,
    validateCreateAlbum,
    validateUpdateAlbum,
} = require('../middlewares/validation/album.validation');

router.get('/:id/songs', authMiddleware, validateAlbumId, albumController.getAlbumSongs);
router.get('/:id', authMiddleware, validateAlbumId, albumController.getAlbumDetail);
router.post('/', authMiddleware, validateCreateAlbum, albumController.createAlbum);
router.put('/:id', authMiddleware, validateAlbumId, validateUpdateAlbum, albumController.updateAlbum);
router.delete('/:id', authMiddleware, validateAlbumId, albumController.deleteAlbum);

module.exports = router;
