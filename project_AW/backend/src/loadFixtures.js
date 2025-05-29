const mongoose = require('mongoose');
const Song = require('./models/Song');
const User = require('./models/User');

const songsData = require('../fixtures/songs.json');
const usersData = require('../fixtures/users.json');

mongoose.connect("mongodb://mongo:27017/musicrate")
    .then(async () => {
        const songsCount = await Song.countDocuments();
        const usersCount = await User.countDocuments();

        if (songsCount === 0) {
            await Song.insertMany(songsData);
            console.log("🎵 Songs fixtures loaded.");
        } else {
            console.log("🎵 Songs collection already has data, skipping load.");
        }

        if (usersCount === 0) {
            await User.insertMany(usersData);
            console.log("👤 Users fixtures loaded.");
        } else {
            console.log("👤 Users collection already has data, skipping load.");
        }

        process.exit();
    })
    .catch(err => {
        console.error('Error loading fixtures:', err);
        process.exit(1);
    });
