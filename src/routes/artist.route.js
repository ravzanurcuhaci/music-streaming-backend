const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artist.controller');
const authMiddleware = require('../middlewares/auth.middlewares');
const {
    validateArtistId,
    validateCreateArtist,
    validateUpdateArtist,
} = require('../middlewares/validation/artist.validation');
router.get('/top', authMiddleware, artistController.getTopArtists);
router.get('/:id/albums', authMiddleware, validateArtistId, artistController.getArtistAlbums);
router.get('/:id', authMiddleware, validateArtistId, artistController.getArtistDetail);
router.post('/', authMiddleware, validateCreateArtist, artistController.createArtist);
router.put('/:id', authMiddleware, validateArtistId, validateUpdateArtist, artistController.updateArtist);
router.delete('/:id', authMiddleware, validateArtistId, artistController.deleteArtist);

module.exports = router;