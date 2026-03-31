const { isEmpty, validationError, isString, isInt } = require('./helpers');

function validateAlbumId(req, res, next) {
    const { id } = req.params;

    if (isEmpty(id) || id.trim() === '') {
        return validationError(res, 'Album ID is required');
    }

    if (!isInt(id)) {
        return validationError(res, 'Album ID must be an integer');
    }

    next();
}
function validateCreateAlbum(req, res, next) {
    if (!req.body) {
        return validationError(res, 'Request body is required');
    }

    const { title, artistId, releaseYear } = req.body;

    if (isEmpty(title) || title.trim() === '') {
        return validationError(res, 'Title is required');
    }

    if (!isString(title)) {
        return validationError(res, 'Title must be a string');
    }

    if (isEmpty(artistId) || artistId.toString().trim() === '') {
        return validationError(res, 'Artist ID is required');
    }

    if (!isInt(artistId.toString())) {
        return validationError(res, 'Artist ID must be an integer');
    }

    if (releaseYear !== undefined) {
        if (isEmpty(releaseYear.toString()) || releaseYear.toString().trim() === '') {
            return validationError(res, 'Release Year cannot be empty if provided');
        }

        if (!isInt(releaseYear.toString())) {
            return validationError(res, 'Release Year must be an integer');
        }
    }

    next();
}

function validateUpdateAlbum(req, res, next) {
    const { title, artistId, releaseYear } = req.body;

    if (title !== undefined) {
        if (isEmpty(title) || title.trim() === '') {
            return validationError(res, 'Title cannot be empty');
        }

        if (!isString(title)) {
            return validationError(res, 'Title must be a string');
        }
    }

    if (artistId !== undefined) {
        if (isEmpty(artistId.toString()) || artistId.toString().trim() === '') {
            return validationError(res, 'Artist ID cannot be empty');
        }

        if (!isInt(artistId.toString())) {
            return validationError(res, 'Artist ID must be an integer');
        }
    }

    if (releaseYear !== undefined) {
        if (isEmpty(releaseYear.toString()) || releaseYear.toString().trim() === '') {
            return validationError(res, 'Release Year cannot be empty if provided');
        }

        if (!isInt(releaseYear.toString())) {
            return validationError(res, 'Release Year must be an integer');
        }
    }

    next();
}

module.exports = {
    validateAlbumId,
    validateCreateAlbum,
    validateUpdateAlbum,
};