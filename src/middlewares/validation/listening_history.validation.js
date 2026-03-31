const { isEmpty, isPositiveNumber, validationError } = require('./helpers');

function validateListeningHistoryId(req, res, next) {
    const { id } = req.params;

    if (isEmpty(id) || id.trim() === '') {
        return validationError(res, 'Listening History ID is required');
    }

    if (!isPositiveNumber(id)) {
        return validationError(res, 'Listening History ID must be a positive number');
    }

    next();
}
function validateCreateListeningHistory(req, res, next) {
    console.log('Validating create listening history request body:', req.body);
    const { userId, songId } = req.body;

    if (userId === undefined || userId === null || userId === '') {
        return validationError(res, 'User ID is required');
    }

    if (!isPositiveNumber(Number(userId))) {
        return validationError(res, 'User ID must be a positive number');
    }

    if (songId === undefined || songId === null || songId === '') {
        return validationError(res, 'Song ID is required');
    }

    if (!isPositiveNumber(Number(songId))) {
        return validationError(res, 'Song ID must be a positive number');
    }

    next();
}
module.exports = {
    validateListeningHistoryId,
    validateCreateListeningHistory,
};