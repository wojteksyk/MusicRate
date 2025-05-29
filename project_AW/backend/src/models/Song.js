const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    value: { type: Number, required: true } // ocena od 1 do 5 (całe liczby)
});

const songSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    ratings: [ratingSchema], // tablica ocen
    averageRating: { type: Number, default: 0 } // średnia ocen
});

module.exports = mongoose.model('Song', songSchema);
