const { get } = require('../app');
const pool = require('../config/db');
const { generateToken } = require('../utils/jwt');

const getUserDetail = async (userId) => {
    const query = 'SELECT * FROM public.fn_get_user_detail($1)';
    const values = [userId];

    const result = await pool.query(query, values);
    return result.rows[0];
};

const registerUser = async ({ username, email, password }) => {
    const query = 'SELECT * FROM public.fn_create_user($1, $2, $3)';
    const values = [username, email, password];

    const result = await pool.query(query, values);
    return result.rows[0];
};


const loginUser = async ({ email, password }) => {
    const query = 'SELECT * FROM public.fn_login($1, $2)';
    const values = [email, password];

    const result = await pool.query(query, values);
    const user = result.rows[0];

    if (!user) {
        throw new Error('Invalid email or password');
    }

    const token = generateToken({
        id: user.user_id,
        email: user.email
    });

    return {
        user,
        token
    };
};

const changeUserPassword = async ({ userId, oldPassword, newPassword }) => {
    const query = 'SELECT * FROM public.fn_change_password($1, $2, $3)';
    const values = [userId, oldPassword, newPassword];

    const result = await pool.query(query, values);
    return result.rows[0];
};
const updateUser = async ({ userId, email, is_active }) => {
    const query = 'SELECT * FROM public.fn_update_user($1, $2, $3)';
    const values = [userId, email, is_active];

    const result = await pool.query(query, values);
    return result.rows[0];
};

const getUserPlaylists = async (userId) => {
    const query = 'SELECT * FROM public.fn_get_user_playlists($1)';
    const values = [userId];

    const result = await pool.query(query, values);
    return result.rows;
};
const getUserListiningHistory = async (userId) => {
    const query = 'SELECT * FROM public.fn_get_user_listening_history($1)';
    const values = [userId];

    const result = await pool.query(query, values);
    return result.rows;
};

const deleteUser = async (userId) => {
    const query = 'SELECT * FROM public.fn_delete_user($1)';
    const values = [userId];

    const result = await pool.query(query, values);
    return result.rows[0];
};


module.exports = {
    getUserDetail,
    registerUser,
    loginUser,
    updateUser,
    changeUserPassword,
    getUserPlaylists,
    getUserListiningHistory,
    deleteUser,
};