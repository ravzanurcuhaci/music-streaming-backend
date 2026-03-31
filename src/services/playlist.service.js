const pool = require('../config/db');

const getPlaylistDetail = async (playlistId) => {
    const query = 'SELECT * FROM public.fn_get_playlist_detail($1)';
    const values = [playlistId];

    const result = await pool.query(query, values);
    return result.rows[0];
};

const createPlaylist = async ({ userId, title, description, isPublic }) => {
    const query = 'SELECT * FROM public.fn_create_playlist($1, $2, $3, $4)';
    const values = [userId, title, description, isPublic];

    const result = await pool.query(query, values);
    return result.rows[0];
};

const updatePlaylist = async ({ playlistId, userId, title, description, isPublic }) => {
    const query = 'SELECT * FROM public.fn_update_playlist($1, $2, $3, $4, $5)';
    const values = [playlistId, userId, title, description, isPublic];

    const result = await pool.query(query, values);
    return result.rows[0];
};

const deletePlaylist = async (playlistId) => {
    const query = 'SELECT * FROM public.fn_delete_playlist($1)';
    const values = [playlistId];

    const result = await pool.query(query, values);
    return result.rows[0];
};

const getPlaylistSongs = async (playlistId) => {
    const query = 'SELECT * FROM public.fn_get_playlist_songs($1)';
    const values = [playlistId];

    const result = await pool.query(query, values);
    return result.rows;
};

module.exports = {
    getPlaylistDetail,
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
    getPlaylistSongs,
};