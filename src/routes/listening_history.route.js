const express = require('express');
const router = express.Router();
const listeningHistoryController = require('../controllers/listening_history.controller');
const authMiddleware = require('../middlewares/auth.middlewares');
const {
    validateListeningHistoryId,
    validateCreateListeningHistory,
} = require('../middlewares/validation/listening_history.validation');

router.get('/:id', authMiddleware, validateListeningHistoryId, listeningHistoryController.getListeningHistoryDetail);
router.post('/', authMiddleware, validateCreateListeningHistory, listeningHistoryController.createListeningHistory);

module.exports = router;        