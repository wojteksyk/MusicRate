import React from 'react';
import AddSongForm from './AddSongForm';
import './SongDetails.css';

function AddSongPage({ onAddSong, showToast, onBack }) {
    return (
        <div style={{ padding: '30px' }}>
            <AddSongForm onAddSong={onAddSong} showToast={showToast} />
            <div className="center-container">
                <button onClick={onBack} className="back-button">
                    Powrót
                </button>
            </div>
        </div>
    );
}

export default AddSongPage;
