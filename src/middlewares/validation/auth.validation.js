const { isEmpty, isValidEmail, isPositiveNumber, validationError } = require('./helpers');
function validateUserId(req, res, next) {
    const { id } = req.params;

    if (isEmpty(id) || id.trim() === '') {
        return validationError(res, 'User ID is required');
    }

    if (!isPositiveNumber(id)) {
        return validationError(res, 'User ID must be a positive number');
    }

    next();
}

function validateRegister(req, res, next) {
    const { username, email, password } = req.body;

    if (isEmpty(username) || username.trim() === '') {
        return validationError(res, 'Username is required');
    }

    if (isEmpty(email) || email.trim() === '') {
        return validationError(res, 'Email is required');
    }

    if (!isValidEmail(email)) {
        return validationError(res, 'Email format is invalid');
    }

    if (isEmpty(password) || password.trim() === '') {
        return validationError(res, 'Password is required');
    }

    if (password.length < 6) {
        return validationError(res, 'Password must be at least 6 characters');
    }

    next();
}

function validateLogin(req, res, next) {
    const { email, password } = req.body;

    if (isEmpty(email) || email.trim() === '') {
        return validationError(res, 'Email is required');
    }

    if (!isValidEmail(email)) {
        return validationError(res, 'Email format is invalid');
    }

    if (isEmpty(password) || password.trim() === '') {
        return validationError(res, 'Password is required');
    }

    next();
}
function validateChangePassword(req, res, next) {
    const { oldPassword, newPassword } = req.body;

    if (isEmpty(oldPassword) || oldPassword.trim() === '') {
        return validationError(res, 'Old password is required');
    }

    if (isEmpty(newPassword) || newPassword.trim() === '') {
        return validationError(res, 'New password is required');
    }

    if (newPassword.length < 6) {
        return validationError(res, 'New password must be at least 6 characters');
    }

    next();
}

module.exports = {
    validateUserId,
    validateRegister,
    validateLogin,
    validateChangePassword,
};