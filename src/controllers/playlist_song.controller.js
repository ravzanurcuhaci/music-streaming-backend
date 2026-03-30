const playlistSongService = require('../services/playlist_song.service');

const addSongToPlaylist = async (req, res, next) => {
    try {
        const { playlistId } = req.params;
        const { songId, position } = req.body;

        const result = await playlistSongService.addSongToPlaylist({
            playlistId,
            songId,
            position,
        });

        return res.status(201).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const removeSongFromPlaylist = async (req, res, next) => {
    try {
        const { playlistId, songId } = req.params;

        const result = await playlistSongService.removeSongFromPlaylist({
            playlistId,
            songId,
        });

        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addSongToPlaylist,
    removeSongFromPlaylist,
};