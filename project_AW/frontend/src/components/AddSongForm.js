import React, { useState } from 'react';
import axios from 'axios';
import './AddSongForm.css';

function AddSongForm({ onAddSong, showToast }) {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/songs', { title, artist });
            onAddSong(res.data);
            showToast('Piosenka dodana pomyślnie!', 'success');
            setTitle('');
            setArtist('');
        } catch (err) {
            showToast('Błąd przy dodawaniu piosenki', 'error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-song-form">
            <h3>Dodaj nową piosenkę</h3>
            <input
                type="text"
                placeholder="Tytuł"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Artysta"
                value={artist}
                onChange={e => setArtist(e.target.value)}
                required
            />
            <button type="submit">Dodaj</button>
        </form>
    );
}

export default AddSongForm;
