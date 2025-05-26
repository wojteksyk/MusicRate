const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: String,
    artist: String,
    rating: Number
});

module.exports = mongoose.model('Song', songSchema);