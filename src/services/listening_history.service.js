const pool = require('../config/db');

const getListeningHistoryDetail = async (historyId) => {
    const query = 'SELECT * FROM public.fn_get_listening_history_detail($1)';
    const values = [historyId];

    const result = await pool.query(query, values);
    return result.rows[0];
};

const createListeningHistory = async ({ userId, songId }) => {

    const query = 'SELECT * FROM public.fn_log_song_play($1, $2)';
    const values = [userId, songId];

    const result = await pool.query(query, values);
    return result.rows[0];
};

module.exports = {
    getListeningHistoryDetail,
    createListeningHistory,
};          