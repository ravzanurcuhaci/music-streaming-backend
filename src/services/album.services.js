const pool = require('../config/db');


const getAlbumDetail = async (albumId) => {
    const query = 'SELECT * FROM public.fn_get_album_detail($1)';
    const values = [albumId];

    const result = await pool.query(query, values);
    return result.rows[0];
};
const createAlbum = async ({ title, artistId, releaseYear }) => {
    const query = 'SELECT * FROM public.fn_create_album($1, $2, $3)';
    const values = [artistId, title, releaseYear];

    const result = await pool.query(query, values);
    return result.rows[0];
};

const updateAlbum = async ({ albumId, title, artistId, releaseYear }) => {
    const query = 'SELECT * FROM public.fn_update_album($1, $2, $3, $4)';
    const values = [albumId, artistId, title, releaseYear];

    const result = await pool.query(query, values);
    return result.rows[0];
};

const deleteAlbum = async (id) => {
    const query = 'SELECT * FROM public.fn_delete_album($1)';
    const values = [id];

    await pool.query(query, values);
};

const getAlbumSongs = async (albumId) => {
    const query = 'SELECT * FROM public.fn_get_album_songs($1)';
    const values = [albumId];

    const result = await pool.query(query, values);
    return result.rows;
};



module.exports = {
    getAlbumDetail,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    getAlbumSongs,
};  
