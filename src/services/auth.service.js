const pool = require('../config/db');

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
    return result.rows[0];
};

const changeUserPassword = async ({ userId, oldPassword, newPassword }) => {
    const query = 'SELECT * FROM public.fn_change_password($1, $2, $3)';
    const values = [userId, oldPassword, newPassword];

    const result = await pool.query(query, values);
    return result.rows[0];
};

module.exports = {
    registerUser,
    loginUser,
    changeUserPassword,
};