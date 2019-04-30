const express = require('express');
const controller = require('../controllers/backup');
const upload = require('../middleware/upload');
const router = express.Router();

// GET /api/backup
router.get('/', controller.getBackups)

// POST /api/backup
router.post('/', controller.createBackup)

// POST /api/open-tetris-url
router.post('/open-tetris-url', controller.openTetrisUrl)

// POST /api/open-aCleaner-url
router.post('/open-cleaner-url', controller.openACleanerUrl)

module.exports = router;