const mongoose = require('mongoose');
const Song = require('./models/Song');
const fixtureData = require('../fixtures/songs.json');

mongoose.connect("mongodb://mongo:27017/musicrate")
    .then(async () => {
        await Song.deleteMany({});
        await Song.insertMany(fixtureData);
        console.log("🎵 Fixtures loaded.");
        process.exit();
    });
