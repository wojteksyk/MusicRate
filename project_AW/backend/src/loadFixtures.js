require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const User = require('./models/User');
const Song = require('./models/Song');

async function loadFixtures() {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb://mongo:27017/musicrate';
        await mongoose.connect(mongoUri);

        console.log('Connected to MongoDB');

        await User.deleteMany({});
        await Song.deleteMany({});

        const usersData = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures', 'users.json')));
        const songsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures', 'songs.json')));

        for (const userData of usersData) {
            const user = new User({
                _id: new mongoose.Types.ObjectId(userData._id),
                username: userData.username,
                password: userData.noHash ? userData.password : userData.password, // tu możesz dodać hashowanie
                role: userData.role || 'user',
            });
            await user.save();
        }

        for (const songData of songsData) {
            const song = new Song({
                title: songData.title,
                artist: songData.artist,
                ratings: songData.ratings.map(r => ({
                    userId: new mongoose.Types.ObjectId(r.userId),
                    value: r.value,
                })),
                averageRating: songData.averageRating || 0,
            });
            await song.save();
        }

        console.log('Fixtures loaded successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Error loading fixtures:', err);
        process.exit(1);
    }
}

loadFixtures();
