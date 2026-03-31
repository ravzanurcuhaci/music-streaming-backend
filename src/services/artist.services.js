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

const updateArtist = async ({ artistId, bio, country }) => {
    const query = 'SELECT * FROM public.fn_update_artist($1, $2, $3)';
    const values = [artistId, bio, country];

    const result = await pool.query(query, values);
    return result.rows[0];
};

const deleteArtist = async (artistId) => {
    const query = 'SELECT * FROM public.fn_delete_artist($1)';
    const values = [artistId];

    const result = await pool.query(query, values);
    return result.rows[0];
};

const getTopArtists = async () => {
    const result = await pool.query("SELECT * FROM fn_get_top_artists()");
    return result.rows;
};
const getArtistAlbums = async (artistId) => {
    const query = 'SELECT * FROM public.fn_get_artist_albums($1)';
    const values = [artistId];

    const result = await pool.query(query, values);
    return result.rows;
};

module.exports = {
    getArtistDetail,
    createArtist,
    updateArtist,
    deleteArtist,
    getTopArtists,
    getArtistAlbums,
};