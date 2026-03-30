const authService = require('../services/auth.service');

const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'username, email and password are required',
            });
        }

        const user = await authService.registerUser({ username, email, password });

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'email and password are required',
            });
        }

        const user = await authService.loginUser({ email, password });

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

const changePassword = async (req, res, next) => {
    try {
        const { userId, oldPassword, newPassword } = req.body;

        if (!userId || !oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'userId, oldPassword and newPassword are required',
            });
        }

        const result = await authService.changeUserPassword({
            userId,
            oldPassword,
            newPassword,
        });

        return res.status(200).json({
            success: true,
            message: 'Password changed successfully',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
    changePassword,
};