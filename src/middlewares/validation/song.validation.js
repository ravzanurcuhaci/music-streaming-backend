const { isEmpty, isPositiveNumber, validationError } = require('./helpers');


function validateSongId(req, res, next) {
    const { id } = req.params;

    if (isEmpty(id)) {
        return validationError(res, 'Song id is required');
    }

    if (!isPositiveNumber(id)) {
        return validationError(res, 'Song id must be a positive number');
    }

    next();
}

function validateCreateSong(req, res, next) {
    const { artistId, title, albumId, durationSeconds, trackNumber } = req.body;

    if (isEmpty(title) || title.trim() === '') {
        return validationError(res, 'Title is required');
    }

    if (isEmpty(artistId)) {
        return validationError(res, 'ArtistId is required');
    }

    if (!isPositiveNumber(artistId)) {
        return validationError(res, 'ArtistId must be a positive number');
    }

    if (isEmpty(durationSeconds)) {
        return validationError(res, 'DurationSeconds is required');
    }

    if (!isPositiveNumber(durationSeconds)) {
        return validationError(res, 'DurationSeconds must be a positive number');
    }

    if (!isEmpty(albumId) && !isPositiveNumber(albumId)) {
        return validationError(res, 'AlbumId must be a positive number');
    }

    if (!isEmpty(trackNumber) && !isPositiveNumber(trackNumber)) {
        return validationError(res, 'TrackNumber must be a positive number');
    }

    next();
}

function validateUpdateSong(req, res, next) {
    console.log('validation bug', req.body);

    const { artistId, title, albumId, durationSeconds, trackNumber } = req.body || {};

    if (isEmpty(title) || title.trim() === '') {
        return validationError(res, 'Title is required');
    }

    if (isEmpty(artistId)) {
        return validationError(res, 'ArtistId is required');
    }

    if (!isPositiveNumber(artistId)) {
        return validationError(res, 'ArtistId must be a positive number');
    }

    if (isEmpty(durationSeconds)) {
        return validationError(res, 'DurationSeconds is required');
    }

    if (!isPositiveNumber(durationSeconds)) {
        return validationError(res, 'DurationSeconds must be a positive number');
    }

    if (!isEmpty(albumId) && !isPositiveNumber(albumId)) {
        return validationError(res, 'AlbumId must be a positive number');
    }

    if (!isEmpty(trackNumber) && !isPositiveNumber(trackNumber)) {
        return validationError(res, 'TrackNumber must be a positive number');
    }

    next();
}




module.exports = {
    validateSongId,
    validateCreateSong,
    validateUpdateSong,
};