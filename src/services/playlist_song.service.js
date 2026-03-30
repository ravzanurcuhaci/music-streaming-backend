const pool = require('../config/db');

const addSongToPlaylist = async ({ playlistId, songId, position }) => {
    const query = 'SELECT * FROM public.fn_add_song_to_playlist($1, $2, $3)';
    const values = [playlistId, songId, position];

    const result = await pool.query(query, values);
    return result.rows[0];
};

const removeSongFromPlaylist = async ({ playlistId, songId }) => {
    const query = 'SELECT * FROM public.fn_remove_song_from_playlist($1, $2)';
    const values = [playlistId, songId];

    const result = await pool.query(query, values);
    return result.rows[0];
};

module.exports = {
    addSongToPlaylist,
    removeSongFromPlaylist,
};