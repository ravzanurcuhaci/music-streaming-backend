const pool = require('../config/db');

const getArtistDetail = async (artistId) => {
    const query = 'SELECT * FROM public.fn_get_artist_detail($1)';
    const values = [artistId];

    const result = await pool.query(query, values);
    return result.rows[0];
};

const createArtist = async ({ name, bio, country }) => {
    const query = 'SELECT * FROM public.fn_create_artist($1, $2, $3)';
    const values = [name, bio, country];

    const result = await pool.query(query, values);
    return result.rows[0];
};

const updateArtist = async ({ artistId, name, bio, country }) => {
    const query = 'SELECT * FROM public.fn_update_artist($1, $2, $3, $4)';
    const values = [artistId, name, bio, country];

    const result = await pool.query(query, values);
    return result.rows[0];
};

const deleteArtist = async (artistId) => {
    const query = 'SELECT * FROM public.fn_delete_artist($1)';
    const values = [artistId];

    const result = await pool.query(query, values);
    return result.rows[0];
};

module.exports = {
    getArtistDetail,
    createArtist,
    updateArtist,
    deleteArtist,
};