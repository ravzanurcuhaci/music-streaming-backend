const playlistService = require('../services/playlist.service');

const getPlaylistDetail = async (req, res, next) => {
    try {
        const { id } = req.params;

        const playlist = await playlistService.getPlaylistDetail(id);

        return res.status(200).json({
            success: true,
            data: playlist,
        });
    } catch (error) {
        next(error);
    }
};

const createPlaylist = async (req, res, next) => {
    try {
        const { userId, title, description, isPublic } = req.body;

        const playlist = await playlistService.createPlaylist({
            userId,
            title,
            description,
            isPublic,
        });

        return res.status(201).json({
            success: true,
            data: playlist,
        });
    } catch (error) {
        next(error);
    }
};

const updatePlaylist = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId, title, description, isPublic } = req.body;

        const playlist = await playlistService.updatePlaylist({
            playlistId: id,
            userId,
            title,
            description,
            isPublic,
        });

        return res.status(200).json({
            success: true,
            data: playlist,
        });
    } catch (error) {
        next(error);
    }
};

const deletePlaylist = async (req, res, next) => {
    try {
        const { id } = req.params;

        const playlist = await playlistService.deletePlaylist(id);

        return res.status(200).json({
            success: true,
            data: playlist,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getPlaylistDetail,
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
};