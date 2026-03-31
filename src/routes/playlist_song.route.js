const express = require('express');
const router = express.Router();
const playlistSongController = require('../controllers/playlist_song.controller');
const authMiddleware = require('../middlewares/auth.middlewares');
const {
    validateAddSong,
    validateRemoveSong,
} = require('../middlewares/validation/playlist_song.validation');

router.post('/:playlistId/songs', authMiddleware, validateAddSong, playlistSongController.addSongToPlaylist);
router.delete('/:playlistId/songs/:songId', authMiddleware, validateRemoveSong, playlistSongController.removeSongFromPlaylist);

module.exports = router;