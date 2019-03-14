const express = require('express');
const controller = require('../controllers/auth');
const router = express.Router();

// POST /api/auth/login
router.post('/login', controller.login)

//POST /api/auth/register
router.post('/register', controller.register)

module.exports = router;
