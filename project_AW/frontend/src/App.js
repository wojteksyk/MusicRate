import React, { useState, useEffect } from 'react';
import AuthForm from './components/AuthForm';
import SongList from './components/SongList';
import SongDetails from './components/SongDetails';
import HamburgerMenu from './components/HamburgerMenu';
import ContactForm from './components/ContactForm';
import Toast from './components/Toast';
import './components/RankingPanel.css';
import axios from 'axios';
import AddSongPage from './components/AddSongPage';

function App() {
    const [user, setUser] = useState(null);
    const [songs, setSongs] = useState([]);
    const [selectedSong, setSelectedSong] = useState(null);
    const [view, setView] = useState('songs');
    const [toast, setToast] = useState({ message: '', type: '', visible: false });
    const [rankingExpanded, setRankingExpanded] = useState(false);

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

    const addSong = (newSong) => {
        setSongs(prev => [...prev, newSong]);
    };

    const showToast = (message, type) => {
        setToast({ message, type, visible: true });
    };

    const hideToast = () => {
        setToast(prev => ({ ...prev, visible: false }));
    };

    const openContactForm = () => setView('contact');
    const closeContactForm = () => setView('songs');
    const openAdminPanel = () => setView('adminPanel');
    const openAddSongForm = () => setView('addSong');

    const topRatedSongs = [...songs]
        .filter(song => song.avgRating != null)
        .sort((a, b) => b.avgRating - a.avgRating)
        .slice(0, 10);

    if (!user) {
        return <AuthForm onLogin={setUser} />;
    }

    return (
        <>
            <div style={{ marginRight: (view === 'songs' && !selectedSong) ? (rankingExpanded ? '33.33vw' : '250px') : 0, transition: 'margin-right 0.3s ease' }}>
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
                        {view === 'songs' && !selectedSong ? `Witaj, ${user.username}` : 'MusicRate'}
                    </h1>
                </div>

                {view === 'songs' && !selectedSong && (
                    <>
                        <SongList songs={songs} onSelectSong={handleSelectSong} />
                        <button
                            onClick={openAddSongForm}
                            style={{
                                position: 'fixed',
                                bottom: '30px',
                                right: rankingExpanded ? '35vw' : '270px',
                                padding: '12px 20px',
                                borderRadius: '50px',
                                border: 'none',
                                backgroundColor: '#5a7dee',
                                color: 'white',
                                fontSize: '16px',
                                cursor: 'pointer',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                zIndex: 999,
                            }}
                        >
                            <b>Dodaj piosenkę</b>
                        </button>
                    </>
                )}

                {view === 'details' && selectedSong && (
                    <SongDetails
                        song={selectedSong}
                        onBack={handleBack}
                        showToast={showToast}
                        user={user}
                    />
                )}

                {view === 'addSong' && (
                    <AddSongPage
                        onAddSong={addSong}
                        showToast={showToast}
                        onBack={() => setView('songs')}
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

            {view === 'songs' && !selectedSong && (
                <div
                    className={`ranking-panel ${rankingExpanded ? 'expanded' : ''}`}
                    style={{
                        position: 'fixed',
                        top: 0,
                        right: 0,
                        height: '100vh',
                        width: rankingExpanded ? '33.33vw' : '250px',
                        backgroundColor: '#f7f7f7',
                        boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
                        overflowY: 'auto',
                        transition: 'width 0.3s ease',
                        zIndex: 9999,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <div
                        className="ranking-header"
                        onClick={() => setRankingExpanded(!rankingExpanded)}
                        style={{
                            padding: '15px',
                            fontWeight: '700',
                            fontSize: '1.2rem',
                            cursor: 'pointer',
                            borderBottom: '1px solid #ddd',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            userSelect: 'none',
                            backgroundColor: '#5a7dee',
                            color: 'white',
                        }}
                    >
                        Ranking
                        <span>{rankingExpanded ? '▲' : '▼'}</span>
                    </div>
                    <div className="ranking-list" style={{ padding: '10px 15px', flexGrow: 1 }}>
                        {topRatedSongs.map((song, index) => (
                            <div key={song.id} className="ranking-item" style={{ marginBottom: '12px', paddingBottom: '6px', borderBottom: '1px solid #ddd' }}>
                                <div className="ranking-title" style={{ fontWeight: '600' }}>
                                    {index + 1}. {song.title}
                                </div>
                                {rankingExpanded && (
                                    <div className="ranking-details" style={{ fontSize: '0.9rem', color: '#555', marginTop: '4px' }}>
                                        <div>Artysta: {song.artist}</div>
                                        <div>Średnia ocen: {song.avgRating?.toFixed(1) || 'Brak'}</div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default App;
