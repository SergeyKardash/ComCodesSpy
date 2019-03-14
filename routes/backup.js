const express = require('express');
const controller = require('../controllers/backup');
const upload = require('../middleware/upload');
const router = express.Router();

// GET /api/backup
router.get('/', controller.getBackups)

// POST /api/backup
router.post('/', controller.createBackup)

// POST /api/open-url
router.post('/open-url', controller.openUrl)

module.exports = router;