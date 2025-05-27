const mongoose = require('mongoose');
const Song = require('./models/Song');
const User = require('./models/User');

const songsData = require('../fixtures/songs.json');
const usersData = require('../fixtures/users.json');

mongoose.connect("mongodb://mongo:27017/musicrate")
    .then(async () => {

        await Song.deleteMany({});
        await User.deleteMany({});

        await Song.insertMany(songsData);
        console.log("🎵 Songs fixtures loaded.");

        await User.insertMany(usersData);
        console.log("👤 Users fixtures loaded.");

        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });