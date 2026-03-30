const errorHandler = (err, req, res, next) => {
    console.error('Global error:', err.message);

    let statusCode = 500;
    let message = err.message || 'INTERNAL_SERVER_ERROR';

    if (message.includes('NOT_FOUND')) {
        statusCode = 404;
    } else if (message.includes('ALREADY_EXISTS') || message.includes('ALREADY_IN')) {
        statusCode = 409;
    } else if (message.includes('INVALID') || message.includes('INCORRECT')) {
        statusCode = 400;
    } else if (message.includes('UNAUTHORIZED')) {
        statusCode = 403;
    }

    return res.status(statusCode).json({
        success: false,
        message,
    });
};

module.exports = errorHandler;