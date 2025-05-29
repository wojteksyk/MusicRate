import React, { useState } from 'react';
import axios from 'axios';
import './SongDetails.css';

const SongDetails = ({ song, onBack, showToast, user }) => {
    const [rating, setRating] = useState(0);

    const handleSaveRating = async () => {
        if (rating < 1 || rating > 5) {
            showToast('Wybierz ocenę od 1 do 5', 'error');
            return;
        }
        try {
            const res = await axios.post(`http://localhost:5000/api/songs/${song._id}/rate`, {
                userId: user._id,
                rating
            });
            showToast('Ocena zapisana', 'success');
            // Opcjonalnie zaktualizuj szczegóły piosenki w App.js albo refetchuj listę
        } catch {
            showToast('Błąd zapisu oceny', 'error');
        }
    };

    return (
        <div className="song-details">
            <button className="back-button" onClick={onBack}>← Powrót</button>
            <h2>{song.title}</h2>
            <p><b>Wykonawca:</b> {song.artist}</p>
            <p><b>Średnia ocena:</b> {song.averageRating.toFixed(2)} ⭐</p>

            <div className="rating">
                <label>Twoja ocena (1-5):</label>
                <select value={rating} onChange={e => setRating(Number(e.target.value))}>
                    <option value={0}>Wybierz ocenę</option>
                    {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
            </div>

            <button className="save-button" onClick={handleSaveRating}>Zapisz ocenę</button>
        </div>
    );
};

export default SongDetails;
