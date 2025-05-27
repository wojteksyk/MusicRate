import React, { useEffect, useState } from 'react';
import './TopRatedPanel.css';
import axios from 'axios';

const TopRatedPanel = ({ isOpen, onClose, onSelectSong }) => {
    const [topSongs, setTopSongs] = useState([]);

    useEffect(() => {
        if (isOpen) {
            axios.get('http://localhost:5000/api/top-rated')
                .then(res => setTopSongs(res.data))
                .catch(err => console.error('Błąd ładowania rankingu', err));
        }
    }, [isOpen]);

    return (
        <div className={`top-rated-panel ${isOpen ? 'open' : ''}`}>
            <div className="panel-header">
                <h3>Ranking utworów</h3>
                <button onClick={onClose}>×</button>
            </div>
            <ul>
                {topSongs.map((song, index) => (
                    <li key={song.id} onClick={() => onSelectSong(song)}>
                        <span>{index + 1}.</span>
                        <div>
                            <strong>{song.title}</strong><br />
                            <span>{song.artist}</span>
                        </div>
                        <span className="rating">{song.averageRating.toFixed(1)}★</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopRatedPanel;
