const express = require('express');
const router = express.Router();
const playlistSongController = require('../controllers/playlist_song.controller');
const {
    validateAddSong,
    validateRemoveSong,
} = require('../middlewares/validation/playlist_song.validation');

router.post('/:playlistId/songs', validateAddSong, playlistSongController.addSongToPlaylist);
router.delete('/:playlistId/songs/:songId', validateRemoveSong, playlistSongController.removeSongFromPlaylist);

module.exports = router;