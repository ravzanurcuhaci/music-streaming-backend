const { get } = require('../app');
const authService = require('../services/auth.service');
const getUserDetail = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await authService.getUserDetail(id);

        return res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

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

        const result = await authService.loginUser({ email, password });

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const changePassword = async (req, res, next) => {
    try {
        const userId = req.user.id; // 🔥 JWT’den geliyor
        const { oldPassword, newPassword } = req.body;

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
const updateUser = async (req, res, next) => {
    try {
        const userId = req.user.id; // 🔥 JWT’den geliyor
        const { email, is_active } = req.body;

        const result = await authService.updateUser({
            userId,
            email,
            is_active
        });

        return res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getUserPlaylists = async (req, res, next) => {
    try {
        const userId = req.user.id; // 🔥 JWT’den geliyo                
        return res.status(200).json({
            success: true,
            data: await authService.getUserPlaylists(userId),
        });
    } catch (error) {
        next(error);
    }
};
const getUserListiningHistory = async (req, res, next) => {
    try {
        const userId = req.user.id; // 🔥 JWT’den geliyo
        return res.status(200).json({
            success: true,
            data: await authService.getUserListiningHistory(userId),
        });
    } catch (error) {
        next(error);
    }
};
const deleteUser = async (req, res, next) => {
    try {
        const userId = req.user.id; // 🔥 JWT’den geliyo
        return res.status(200).json({
            success: true,
            data: await authService.deleteUser(userId),
        });
    } catch (error) {
        next(error);
    }
};
module.exports = {
    getUserDetail,
    register,
    login,
    changePassword,
    updateUser,
    getUserPlaylists,
    getUserListiningHistory,
    deleteUser,
};