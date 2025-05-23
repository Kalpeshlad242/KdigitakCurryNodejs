const express = require('express');
const router = express.Router();
const { signup, login, logout } = require('../controller/authController');

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout); // frontend should clear token

module.exports = router;
