const express = require('express');
const controller = require('../controllers/device');
const passport = require('passport');
const router = express.Router();

// GET /api/device/
router.get('/',  passport.authenticate('jwt', {session: false}), controller.getDevices);

// GET /api/device/:id
router.get('/:id', controller.getDeviceById);

// POST /api/device
router.post('/', controller.createDevice);

// DELETE /api/device/:id
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.removeDevice);

module.exports = router;