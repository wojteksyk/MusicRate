const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Song = require('./models/Song');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');





const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

mongoose.connect(process.env.MONGO_URL || "mongodb://mongo:27017/musicrate");

app.get('/api/songs', async (req, res) => {
    const songs = await Song.find();
    res.json(songs);
});

app.get('/api/health', (req, res) => {
    res.json({ status: "ok" });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
