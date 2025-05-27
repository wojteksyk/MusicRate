const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/users – zwraca wszystkich użytkowników bez haseł
router.get('/', async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // '-password' wyklucza pole hasła
        res.status(200).json(users);
    } catch (err) {
        console.error('Błąd podczas pobierania użytkowników:', err);
        res.status(500).json({ error: 'Wystąpił błąd serwera.' });
    }
});

module.exports = router;