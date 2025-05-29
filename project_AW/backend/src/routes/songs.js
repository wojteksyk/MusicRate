const express = require('express');
const router = express.Router();
const Song = require('../models/Song');

// Pobierz wszystkie piosenki
router.get('/', async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (err) {
        res.status(500).json({ error: 'Błąd serwera' });
    }
});

// Dodaj nową piosenkę
router.post('/', async (req, res) => {
    const { title, artist } = req.body;
    if (!title || !artist) {
        return res.status(400).json({ error: 'Brak tytułu lub artysty' });
    }
    try {
        const newSong = new Song({ title, artist, ratings: [], averageRating: 0 });
        await newSong.save();
        res.status(201).json(newSong);
    } catch (err) {
        res.status(500).json({ error: 'Błąd serwera' });
    }
});

// Dodaj lub zaktualizuj ocenę piosenki przez użytkownika
router.post('/:id/rate', async (req, res) => {
    const songId = req.params.id;
    const { userId, rating } = req.body; // userId z frontu (po zalogowaniu)

    if (!userId || !rating || rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Nieprawidłowe dane oceny' });
    }

    try {
        const song = await Song.findById(songId);
        if (!song) return res.status(404).json({ error: 'Piosenka nie znaleziona' });

        // Sprawdź czy użytkownik już ocenił
        const existingRating = song.ratings.find(r => r.userId.toString() === userId);
        if (existingRating) {
            existingRating.value = rating; // aktualizuj ocenę
        } else {
            song.ratings.push({ userId, value: rating }); // dodaj ocenę
        }

        // Przelicz średnią ocenę
        const sum = song.ratings.reduce((acc, r) => acc + r.value, 0);
        song.averageRating = sum / song.ratings.length;

        await song.save();
        res.json(song);
    } catch (err) {
        res.status(500).json({ error: 'Błąd serwera' });
    }
});

module.exports = router;
