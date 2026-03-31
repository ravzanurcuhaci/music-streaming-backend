const albumService = require('../services/album.services');

const getAlbumDetail = async (req, res, next) => {
    try {
        const { id } = req.params;

        const album = await albumService.getAlbumDetail(id);

        return res.status(200).json({
            success: true,
            data: album,
        });
    } catch (error) {
        next(error);
    }
};

const createAlbum = async (req, res, next) => {
    try {
        const { title, artistId, releaseYear } = req.body || {};

        const album = await albumService.createAlbum({
            title,
            artistId,
            releaseYear,
        });

        return res.status(201).json({
            success: true,
            data: album,
        });
    } catch (error) {
        next(error);
    }
};


const updateAlbum = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, artistId, releaseYear } = req.body;

        const album = await albumService.updateAlbum({
            albumId: id,
            title,
            artistId,
            releaseYear,
        });

        return res.status(200).json({
            success: true,
            data: album,
        });
    } catch (error) {
        next(error);
    }
};

const deleteAlbum = async (req, res, next) => {
    try {
        const { id } = req.params;

        await albumService.deleteAlbum(id);

        return res.status(200).json({
            success: true,
            message: `Album with id ${id} has been deleted`,
        });
    } catch (error) {
        next(error);
    }
};

const getAlbumSongs = async (req, res, next) => {
    try {
        const { id } = req.params;

        const songs = await albumService.getAlbumSongs(id);

        return res.status(200).json({
            success: true,
            data: songs,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAlbumDetail,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    getAlbumSongs,
};