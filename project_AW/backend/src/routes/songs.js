const express = require('express');
const router = express.Router();
const Song = require('../models/Song');


router.get('/', async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (err) {
        res.status(500).json({ error: 'Błąd serwera' });
    }
});


router.post('/', async (req, res) => {
    const { title, artist } = req.body;
    if (!title || !artist) {
        return res.status(400).json({ error: 'Tytuł i wykonawca są wymagane' });
    }
    try {
        const newSong = new Song({
            title,
            artist,
            ratings: [],
            averageRating: 0,
        });
        await newSong.save();
        res.status(201).json(newSong);
    } catch (err) {
        res.status(500).json({ error: 'Błąd serwera' });
    }
});

router.post('/:id/rate', async (req, res) => {
    const songId = req.params.id;
    const { userId, rating } = req.body;

    if (!userId || !rating || rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Nieprawidłowe dane oceny' });
    }

    try {
        const song = await Song.findById(songId);
        if (!song) return res.status(404).json({ error: 'Piosenka nie znaleziona' });

        const existingRating = song.ratings.find(r => r.userId.toString() === userId);
        if (existingRating) {
            existingRating.value = rating;
        } else {
            song.ratings.push({ userId, value: rating });
        }

        const sum = song.ratings.reduce((acc, r) => acc + r.value, 0);
        song.averageRating = sum / song.ratings.length;

        await song.save();
        res.json(song);
    } catch (err) {
        res.status(500).json({ error: 'Błąd serwera' });
    }
});

module.exports = router;
