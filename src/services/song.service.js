const pool = require('../config/db');

const getSongDetail = async (songId) => {
    const query = 'SELECT * FROM public.fn_get_song_detail($1)';
    const values = [songId];

    const result = await pool.query(query, values);
    return result.rows[0];
};

const createSong = async ({ artistId, title, albumId, durationSeconds, trackNumber }) => {
    const query = 'SELECT * FROM public.fn_create_song($1, $2, $3, $4, $5)';
    const values = [artistId, title, albumId, durationSeconds, trackNumber];

    const result = await pool.query(query, values);
    return result.rows[0];
};

const updateSong = async ({ songId, artistId, title, albumId, durationSeconds, trackNumber }) => {
    const query = 'SELECT * FROM public.fn_update_song($1, $2, $3, $4, $5, $6)';
    const values = [songId, artistId, title, albumId, durationSeconds, trackNumber];

    const result = await pool.query(query, values);
    return result.rows[0];
};

const deleteSong = async (songId) => {
    const query = 'SELECT * FROM public.fn_delete_song($1)';
    const values = [songId];

    const result = await pool.query(query, values);
    return result.rows[0];
};

const getTopSongs = async () => {
    console.log('service bug');
    const result = await pool.query("SELECT * FROM fn_get_top_songs()");
    return result.rows;
};

const getRelatedSongs = async (songId) => {
    const query = 'SELECT * FROM public.fn_get_related_songs($1)';
    const values = [songId];

    const result = await pool.query(query, values);
    return result.rows;
};



module.exports = {
    getSongDetail,
    createSong,
    updateSong,
    deleteSong,
    getTopSongs,
    getRelatedSongs,

};