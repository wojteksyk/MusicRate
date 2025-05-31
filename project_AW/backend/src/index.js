require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Song = require('./models/Song');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const songsRoutes = require('./routes/songs');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/songs', songsRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: "ok" });
});

const mongoUri = process.env.MONGO_URI || 'mongodb://mongo:27017/musicrate';
mongoose.connect(mongoUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
