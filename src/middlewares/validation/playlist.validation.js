const { isEmpty, isPositiveNumber, validationError } = require('./helpers');

function validatePlaylistId(req, res, next) {
    const { id } = req.params;

    if (isEmpty(id)) {
        return validationError(res, 'Playlist id is required');
    }

    if (!isPositiveNumber(id)) {
        return validationError(res, 'Playlist id must be a positive number');
    }

    next();
}

function validateCreatePlaylist(req, res, next) {
    const { userId, title, isPublic } = req.body;

    if (isEmpty(userId)) {
        return validationError(res, 'UserId is required');
    }

    if (!isPositiveNumber(userId)) {
        return validationError(res, 'UserId must be a positive number');
    }

    if (isEmpty(title) || title.trim() === '') {
        return validationError(res, 'Title is required');
    }

    if (!isEmpty(isPublic) && typeof isPublic !== 'boolean') {
        return validationError(res, 'isPublic must be a boolean');
    }

    next();
}

function validateUpdatePlaylist(req, res, next) {
    const { userId, title, isPublic } = req.body;

    if (isEmpty(userId)) {
        return validationError(res, 'UserId is required');
    }

    if (!isPositiveNumber(userId)) {
        return validationError(res, 'UserId must be a positive number');
    }

    if (isEmpty(title) || title.trim() === '') {
        return validationError(res, 'Title is required');
    }

    if (!isEmpty(isPublic) && typeof isPublic !== 'boolean') {
        return validationError(res, 'isPublic must be a boolean');
    }

    next();
}

module.exports = {
    validatePlaylistId,
    validateCreatePlaylist,
    validateUpdatePlaylist,
};
