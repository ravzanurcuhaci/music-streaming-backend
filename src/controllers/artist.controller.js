const artistService = require('../services/artist.services');

const getArtistDetail = async (req, res, next) => {
    try {
        const { id } = req.params;

        const artist = await artistService.getArtistDetail(id);

        return res.status(200).json({
            success: true,
            data: artist,
        });
    } catch (error) {
        next(error);
    }
};

const createArtist = async (req, res, next) => {
    try {
        const { name, bio, country } = req.body;

        const artist = await artistService.createArtist({
            name,
            bio,
            country,
        });

        return res.status(201).json({
            success: true,
            data: artist,
        });
    } catch (error) {
        next(error);

    }
};

const updateArtist = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, bio, country } = req.body;

        const artist = await artistService.updateArtist({
            artistId: id,
            name,
            bio,
            country,
        });

        return res.status(200).json({
            success: true,
            data: artist,
        });
    } catch (error) {
        next(error);

    }
};

const deleteArtist = async (req, res, next) => {
    try {
        const { id } = req.params;

        const artist = await artistService.deleteArtist(id);

        return res.status(200).json({
            success: true,
            data: artist,
        });
    } catch (error) {
        next(error);
    }
};
const getTopArtists = async (req, res, next) => {
    try {
        const artists = await artistService.getTopArtists();

        return res.status(200).json({
            success: true,
            data: artists,
        });
    } catch (error) {
        next(error);
    }
};
const getArtistAlbums = async (req, res, next) => {
    try {
        const { id } = req.params;

        const albums = await artistService.getArtistAlbums(id);

        return res.status(200).json({
            success: true,
            data: albums,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getArtistDetail,
    createArtist,
    updateArtist,
    deleteArtist,
    getTopArtists,
    getArtistAlbums,
};