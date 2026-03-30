const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artist.controller');
const {
    validateArtistId,
    validateCreateArtist,
    validateUpdateArtist,
} = require('../middlewares/validation/artist.validation');

router.get('/:id', validateArtistId, artistController.getArtistDetail);
router.post('/', validateCreateArtist, artistController.createArtist);
router.put('/:id', validateArtistId, validateUpdateArtist, artistController.updateArtist);
router.delete('/:id', validateArtistId, artistController.deleteArtist);

module.exports = router;