const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlist.controller');
const authMiddleware = require('../middlewares/auth.middlewares');
const {
    validatePlaylistId,
    validateCreatePlaylist,
    validateUpdatePlaylist,
} = require('../middlewares/validation/playlist.validation');

router.get('/:id', authMiddleware, validatePlaylistId, playlistController.getPlaylistDetail);
router.post('/', authMiddleware, validateCreatePlaylist, playlistController.createPlaylist);
router.put('/:id', authMiddleware, validatePlaylistId, validateUpdatePlaylist, playlistController.updatePlaylist);
router.delete('/:id', authMiddleware, validatePlaylistId, playlistController.deletePlaylist);
router.get('/:id/songs', authMiddleware, validatePlaylistId, playlistController.getPlaylistSongs);
module.exports = router;