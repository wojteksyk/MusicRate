import React from 'react';
import './SongList.css';

const SongList = ({ songs, onSelectSong }) => {
    return (
        <div className="song-list">
            {songs.map(song => (
                <div key={song.id} className="song-card">
                    <h3>{song.title}</h3>
                    <p>{song.artist}</p>
                    <button onClick={() => onSelectSong(song)}><b>Szczegóły</b></button>
                </div>
            ))}
        </div>
    );
};

export default SongList;
