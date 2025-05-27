import React, { useState, useEffect } from 'react';
import AuthForm from './components/AuthForm';
import SongList from './components/SongList';
import SongDetails from './components/SongDetails';
import HamburgerMenu from './components/HamburgerMenu';
import ContactForm from './components/ContactForm';
import Toast from './components/Toast';
import axios from 'axios';

function App() {
    const [user, setUser] = useState(null);
    const [songs, setSongs] = useState([]);
    const [selectedSong, setSelectedSong] = useState(null);
    const [view, setView] = useState('songs'); // 'songs', 'details', 'contact', 'adminPanel'
    const [toast, setToast] = useState({ message: '', type: '', visible: false });

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
        setSelectedSong(null);
        setView('songs');
    };

    const handleSelectSong = (song) => {
        setSelectedSong(song);
        setView('details');
    };

    const handleBack = () => {
        setSelectedSong(null);
        setView('songs');
    };

    const showToast = (message, type) => {
        setToast({ message, type, visible: true });
    };

    const hideToast = () => {
        setToast(prev => ({ ...prev, visible: false }));
    };

    const openContactForm = () => {
        setView('contact');
    };

    const closeContactForm = () => {
        setView('songs');
    };

    const openAdminPanel = () => {
        setView('adminPanel');
    };

    if (!user) {
        return <AuthForm onLogin={setUser} />;
    }

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', padding: '10px 30px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: 30 }}>
                    <HamburgerMenu
                        onLogout={handleLogout}
                        isAdmin={user.role === 'admin'}
                        onContactClick={openContactForm}
                        onAdminPanelClick={openAdminPanel}
                    />
                </div>
                <h1 className="welcome-header" style={{ flexGrow: 1, textAlign: 'center', margin: 0 }}>
                    Witaj, {user.username}
                </h1>
            </div>

            {view === 'songs' && !selectedSong && (
                <SongList songs={songs} onSelectSong={handleSelectSong} />
            )}

            {view === 'details' && selectedSong && (
                <SongDetails
                    song={selectedSong}
                    onBack={handleBack}
                    showToast={showToast}
                />
            )}

            {view === 'contact' && (
                <ContactForm
                    onClose={closeContactForm}
                    showToast={showToast}
                />
            )}

            {view === 'adminPanel' && (
                <div style={{ padding: 30, textAlign: 'center' }}>
                    <h2>Panel administratora - w przygotowaniu</h2>
                    <button
                        onClick={() => setView('songs')}
                        style={{
                            marginTop: 20,
                            padding: '10px 20px',
                            borderRadius: 6,
                            border: 'none',
                            backgroundColor: '#e0e0e0',
                            color: '#5a7dee',
                            fontSize: 16,
                            cursor: 'pointer',
                            fontWeight: '600',
                        }}
                    >
                        Powrót
                    </button>
                </div>
            )}

            {toast.visible && (
                <Toast message={toast.message} type={toast.type} onClose={hideToast} />
            )}
        </div>
    );
}

export default App;
