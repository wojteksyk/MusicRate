import React from 'react';
import './SongList.css';

const SongList = ({ songs }) => {
    return (
        <div className="songlist-wrapper">
            <h2>Lista piosenek</h2>
            <ul className="songlist">
                {songs.map(song => (
                    <li key={song._id} className="song-card">
                        <div className="song-title">{song.title}</div>
                        <div className="song-artist">{song.artist}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SongList;