const { isEmpty, isPositiveNumber, validationError } = require('./helpers');

function validateAddSong(req, res, next) {
    const { playlistId } = req.params;
    const { songId, position } = req.body;

    if (isEmpty(playlistId)) {
        return validationError(res, 'PlaylistId is required');
    }

    if (!isPositiveNumber(playlistId)) {
        return validationError(res, 'PlaylistId must be a positive number');
    }

    if (isEmpty(songId)) {
        return validationError(res, 'SongId is required');
    }

    if (!isPositiveNumber(songId)) {
        return validationError(res, 'SongId must be a positive number');
    }

    if (!isEmpty(position) && !isPositiveNumber(position)) {
        return validationError(res, 'Position must be a positive number');
    }

    next();
}

function validateRemoveSong(req, res, next) {
    const { playlistId, songId } = req.params;

    if (isEmpty(playlistId)) {
        return validationError(res, 'PlaylistId is required');
    }

    if (!isPositiveNumber(playlistId)) {
        return validationError(res, 'PlaylistId must be a positive number');
    }

    if (isEmpty(songId)) {
        return validationError(res, 'SongId is required');
    }

    if (!isPositiveNumber(songId)) {
        return validationError(res, 'SongId must be a positive number');
    }

    next();
}

module.exports = {
    validateAddSong,
    validateRemoveSong,
};
