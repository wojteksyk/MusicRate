import React, { useState } from 'react';
import './SongDetails.css';

const Star = ({ filled, clickable, onClick, onMouseEnter, onMouseLeave }) => {
    return (
        <span
            style={{
                cursor: clickable ? 'pointer' : 'default',
                color: filled ? '#ffc107' : '#e4e5e9',
                fontSize: '30px',
                userSelect: 'none',
                marginRight: '5px',
            }}
            onClick={clickable ? onClick : undefined}
            onMouseEnter={clickable ? onMouseEnter : undefined}
            onMouseLeave={clickable ? onMouseLeave : undefined}
        >
      ★
    </span>
    );
};

const SongDetails = ({ song, onBack, showToast }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSave = () => {
        if (rating === 0 || comment.trim() === '') {
            showToast('Proszę podać ocenę i komentarz!', 'error');
            return;
        }
        // Przykład wysyłki na backend:
        // axios.post('/api/rate', { songId: song.id, rating, comment })

        showToast(`Ocena: ${rating}, komentarz zapisane!`, 'success');
    };

    const average = song.averageRating || 0; // np. 3.6 z backendu
    const roundedAverage = Math.round(average); // do pokazania pełnych gwiazdek

    return (
        <div className="song-details">
            <button onClick={onBack} className="back-button">← Powrót</button>
            <h2>{song.title} — {song.artist}</h2>

            <div className="rating">
                <label>Twoja ocena:</label>
                <div>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            filled={hoverRating >= star || rating >= star}
                            clickable={true}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                        />
                    ))}
                </div>
            </div>

            <div className="average-rating" style={{ marginBottom: '20px' }}>
                <label>Średnia ocen:</label>
                <div>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            filled={star <= roundedAverage}
                            clickable={false}
                        />
                    ))}
                    <span style={{ marginLeft: '10px', fontSize: '16px', color: '#333' }}>
            {average.toFixed(1)} / 5
          </span>
                </div>
            </div>

            <div className="comment">
                <label>Komentarz:</label>
                <textarea
                    rows="4"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </div>

            <button onClick={handleSave} className="save-button">Zapisz</button>
        </div>
    );
};

export default SongDetails;
