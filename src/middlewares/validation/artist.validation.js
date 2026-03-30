const { isEmpty, isPositiveNumber, validationError } = require('./helpers');

function validateArtistId(req, res, next) {
    const { id } = req.params;

    if (isEmpty(id)) {
        return validationError(res, 'Artist id is required');
    }

    if (!isPositiveNumber(id)) {
        return validationError(res, 'Artist id must be a positive number');
    }

    next();
}

function validateCreateArtist(req, res, next) {
    const { name } = req.body;

    if (isEmpty(name) || name.trim() === '') {
        return validationError(res, 'Name is required');
    }

    next();
}

function validateUpdateArtist(req, res, next) {
    const { name } = req.body;

    if (isEmpty(name) || name.trim() === '') {
        return validationError(res, 'Name is required');
    }

    next();
}

module.exports = {
    validateArtistId,
    validateCreateArtist,
    validateUpdateArtist,
};
