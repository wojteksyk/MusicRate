import React, { useState } from 'react';
import './SongDetails.css';

const SongDetails = ({ song, onBack, showToast }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSave = () => {
        if (rating === 0 || comment.trim() === '') {
            showToast('Proszę podać ocenę i komentarz!', 'error');
            return;
        }
        // Tutaj możesz wysłać ocenę i komentarz na backend jeśli chcesz
        showToast('Ocena i komentarz zapisane!', 'success');
    };

    return (
        <div className="song-details">
            <button onClick={onBack} className="back-button">← Powrót</button>
            <h2>{song.title} — {song.artist}</h2>

            <div className="rating">
                <label>Ocena (0-5):</label>
                <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.5"
                    value={rating}
                    onChange={e => setRating(parseFloat(e.target.value))}
                />
            </div>

            <div className="comment">
                <label>Komentarz:</label>
                <textarea
                    rows="4"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                />
            </div>

            <button onClick={handleSave} className="save-button">Zapisz</button>
        </div>
    );
};

export default SongDetails;
