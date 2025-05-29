import React from 'react';
import AddSongForm from './AddSongForm';

function AddSongPage({ onAddSong, showToast, onBack }) {
    return (
        <div style={{ padding: '30px' }}>
            <AddSongForm onAddSong={onAddSong} showToast={showToast} />
            <button
                onClick={onBack}
                style={{
                    display: 'block',
                    margin: '20px auto 0 auto',
                    padding: '10px 20px',
                    borderRadius: 8,
                    border: 'none',
                    backgroundColor: '#5a7dee',
                    color: 'white',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '1rem',
                }}
            >
                Powrót
            </button>
        </div>
    );
}

export default AddSongPage;
