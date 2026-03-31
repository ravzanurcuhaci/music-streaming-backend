const listeningHistoryService = require('../services/listening_history.service');

const getListeningHistoryDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const listeningHistory = await listeningHistoryService.getListeningHistoryDetail(id);
        res.json(listeningHistory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const createListeningHistory = async (req, res) => {
    console.log('Received request to create listening history with body:', req.body);
    try {
        const { userId, songId } = req.body;
        const listeningHistory = await listeningHistoryService.createListeningHistory({ userId, songId });
        res.status(201).json(listeningHistory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = {
    getListeningHistoryDetail,
    createListeningHistory,
};