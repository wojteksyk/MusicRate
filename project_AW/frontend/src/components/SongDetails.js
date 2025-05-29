import React, { useState } from 'react';
import axios from 'axios';
import './SongDetails.css';

const SongDetails = ({ song, onBack, showToast, user }) => {
    const [rating, setRating] = useState(0);
    const [hovered, setHovered] = useState(0);

    const handleSaveRating = async () => {
        if (rating < 1 || rating > 5) {
            showToast('Wybierz ocenę od 1 do 5', 'error');
            return;
        }
        try {
            await axios.post(`http://localhost:5000/api/songs/${song._id}/rate`, {
                userId: user._id,
                rating
            });
            showToast('Ocena zapisana', 'success');
        } catch {
            showToast('Błąd zapisu oceny', 'error');
        }
    };

    const renderStars = () => {
        return [...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
                <span
                    key={starValue}
                    className={`star ${starValue <= (hovered || rating) ? 'filled' : ''}`}
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHovered(starValue)}
                    onMouseLeave={() => setHovered(0)}
                >
                    ★
                </span>
            );
        });
    };

    return (
        <div className="song-details">
            <button className="back-button" onClick={onBack}>← Powrót</button>
            <h2>{song.title}</h2>
            <p><b>Wykonawca:</b> {song.artist}</p>
            <p><b>Średnia ocena:</b> {song.averageRating?.toFixed(2) || 'Brak'} ⭐</p>

            <div className="rating">
                <label>Twoja ocena:</label>
                <div className="star-rating">{renderStars()}</div>
            </div>

            <button className="save-button" onClick={handleSaveRating}>Zapisz ocenę</button>
        </div>
    );
};

export default SongDetails;
