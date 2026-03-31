const express = require('express');
const router = express.Router();
const songController = require('../controllers/song.controller');
const authMiddleware = require('../middlewares/auth.middlewares');
const {
    validateCreateSong,
    validateUpdateSong,
    validateSongId
} = require('../middlewares/validation/song.validation');

router.get('/top', authMiddleware, songController.getTopSongs);
router.get('/:id', authMiddleware, validateSongId, songController.getSongDetail);
router.post('/', authMiddleware, validateCreateSong, songController.createSong);
router.put('/:id', authMiddleware, validateSongId, validateUpdateSong, songController.updateSong);
router.delete('/:id', authMiddleware, validateSongId, songController.deleteSong);
router.get('/:id/related', authMiddleware, validateSongId, songController.getRelatedSongs);

module.exports = router;