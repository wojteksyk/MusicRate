import React, { useState, useEffect } from 'react';
import AuthForm from './components/AuthForm';
import SongList from './components/SongList';
import HamburgerMenu from './components/HamburgerMenu';
import axios from 'axios';
import './App.css';

function App() {
    const [user, setUser] = useState(null);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        if (user) {
            axios.get('http://localhost:5000/api/songs')
                .then(res => setSongs(res.data))
                .catch(console.error);
        }
    }, [user]);

    const handleLogout = () => {
        setUser(null);
        setSongs([]);
    };

    if (!user) {
        return <AuthForm onLogin={setUser} />;
    }

    return (
        <div>
            <HamburgerMenu onLogout={handleLogout} />
            <h1 className="welcome-header">Witaj, {user.username}</h1>
            <SongList songs={songs} />
        </div>
    );
}

export default App;