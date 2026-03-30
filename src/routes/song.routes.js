const express = require('express');
const router = express.Router();
const songController = require('../controllers/song.controller');
const {
    validateCreateSong,
    validateUpdateSong,
    validateSongId
} = require('../middlewares/validation/song.validation');

router.get('/:id', validateSongId, songController.getSongDetail);
router.post('/', validateCreateSong, songController.createSong);
router.put('/:id', validateSongId, validateUpdateSong, songController.updateSong);
router.delete('/:id', validateSongId, songController.deleteSong);

module.exports = router;