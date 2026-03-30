const songService = require('../services/song.service');

const getSongDetail = async (req, res, next) => {
    try {
        const { id } = req.params;

        const song = await songService.getSongDetail(id);

        return res.status(200).json({
            success: true,
            data: song,
        });
    } catch (error) {
        next(error);
    }
};

const createSong = async (req, res, next) => {
    try {
        const { artistId, title, albumId, durationSeconds, trackNumber } = req.body;

        const song = await songService.createSong({
            artistId,
            title,
            albumId,
            durationSeconds,
            trackNumber,
        });

        return res.status(201).json({
            success: true,
            data: song,
        });
    } catch (error) {
        next(error);
    }
};

const updateSong = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { artistId, title, albumId, durationSeconds, trackNumber } = req.body;

        const song = await songService.updateSong({
            songId: id,
            artistId,
            title,
            albumId,
            durationSeconds,
            trackNumber,
        });

        return res.status(200).json({
            success: true,
            data: song,
        });
    } catch (error) {
        next(error);
    }
};

const deleteSong = async (req, res, next) => {
    try {
        const { id } = req.params;

        const song = await songService.deleteSong(id);

        return res.status(200).json({
            success: true,
            data: song,
        });
    } catch (error) {
        next(error);
    }
};
//fonksiyonları dışarı açarak diğer dosyalardan erişilebilir hale getiriyoruz
module.exports = {
    getSongDetail,
    createSong,
    updateSong,
    deleteSong,
};