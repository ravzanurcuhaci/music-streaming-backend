const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlist.controller');
const {
    validatePlaylistId,
    validateCreatePlaylist,
    validateUpdatePlaylist,
} = require('../middlewares/validation/playlist.validation');

router.get('/:id', validatePlaylistId, playlistController.getPlaylistDetail);
router.post('/', validateCreatePlaylist, playlistController.createPlaylist);
router.put('/:id', validatePlaylistId, validateUpdatePlaylist, playlistController.updatePlaylist);
router.delete('/:id', validatePlaylistId, playlistController.deletePlaylist);

module.exports = router;