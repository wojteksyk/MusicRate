import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SongList = () => {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/songs')
            .then(response => setSongs(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h2>Lista piosenek</h2>
            <ul>
                {songs.map((song, idx) => (
                    <li key={idx}>
                        {song.title} - {song.artist} (Rating: {song.rating})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SongList;
