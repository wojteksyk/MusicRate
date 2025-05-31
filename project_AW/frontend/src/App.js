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
    const [users, setUsers] = useState([]);
    const [selectedSong, setSelectedSong] = useState(null);
    const [view, setView] = useState('songs');
    const [toast, setToast] = useState({ message: '', type: '', visible: false });
    const [rankingExpanded, setRankingExpanded] = useState(false);


    useEffect(() => {
        if (user) {
            fetchSongs();
        }
    }, [user]);


    const fetchSongs = () => {
        axios.get('http://localhost:5000/api/songs')
            .then(res => setSongs(res.data))
            .catch(() => showToast('Błąd przy pobieraniu piosenek', 'error'));
    };


    const fetchUsers = () => {
        axios.get('http://localhost:5000/api/users')
            .then(res => setUsers(res.data))
            .catch(() => showToast('Błąd przy pobieraniu użytkowników', 'error'));
    };

    const handleLogout = () => {
        setUser(null);
        setSongs([]);
        setUsers([]);
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
    const openAdminPanel = () => {
        if (user?.role === 'admin') {
            fetchUsers();
            setView('adminPanel');
        } else {
            showToast('Brak dostępu do panelu administratora', 'error');
        }
    };
    const openAddSongForm = () => setView('addSong');

    const updateSelectedSong = (updatedSong) => {
        setSelectedSong(updatedSong);
        setSongs(prevSongs => prevSongs.map(song =>
            song._id === updatedSong._id ? updatedSong : song
        ));
    };


    const deleteSong = (id) => {
        if (!window.confirm('Na pewno chcesz usunąć tę piosenkę?')) return;
        axios.delete(`http://localhost:5000/api/songs/${id}`)
            .then(() => {
                setSongs(prev => prev.filter(s => s._id !== id));
                showToast('Piosenka usunięta', 'success');
            })
            .catch(() => {
                showToast('Błąd przy usuwaniu piosenki', 'error');
            });
    };


    const topRatedSongs = [...songs]
        .filter(song => song.averageRating != null)
        .sort((a, b) => b.averageRating - a.averageRating)
        .slice(0, 10);

    if (!user) {
        return <AuthForm onLogin={setUser} />;
    }

    return (
        <>
            <div
                style={{
                    marginRight: (view === 'songs' && !selectedSong) ? (rankingExpanded ? '33.33vw' : '250px') : 0,
                    transition: 'margin-right 0.3s ease'
                }}
            >
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
                        onUpdateSong={updateSelectedSong}
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

                {view === 'adminPanel' && user.role === 'admin' && (
                    <div style={{
                        padding: 30,
                        maxWidth: 800,
                        margin: '0 auto',
                        backgroundColor: '#f7f7f7',
                        borderRadius: 8,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        color: '#333',
                        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    }}>
                        <h2 style={{color: '#5a7dee', marginBottom: 20, fontWeight: '700'}}>Panel administratora</h2>

                        <section style={{marginBottom: 40}}>
                            <h3 style={{color: '#5a7dee', marginBottom: 15}}>Użytkownicy:</h3>
                            <ul style={{listStyle: 'none', padding: 0}}>
                                {users.map(u => (
                                    <li
                                        key={u._id}
                                        style={{
                                            backgroundColor: 'white',
                                            marginBottom: 10,
                                            padding: '10px 15px',
                                            borderRadius: 6,
                                            boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            fontWeight: '600',
                                            fontSize: '1rem',
                                            color: '#444',
                                        }}
                                    >
                                        <span>{u.username} <small
                                            style={{color: '#777', fontWeight: '400'}}>({u.role})</small></span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h3 style={{color: '#5a7dee', marginBottom: 15}}>Lista piosenek:</h3>
                            <ul style={{listStyle: 'none', padding: 0}}>
                                {songs.map(s => (
                                    <li
                                        key={s._id}
                                        style={{
                                            backgroundColor: 'white',
                                            marginBottom: 12,
                                            padding: '12px 15px',
                                            borderRadius: 6,
                                            boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            fontWeight: '600',
                                            fontSize: '1rem',
                                            color: '#444',
                                        }}
                                    >
                                        <span>{s.title} — {s.artist} — Średnia ocena: {s.averageRating?.toFixed(1) || 'Brak'}</span>
                                        <button
                                            onClick={() => deleteSong(s._id)}
                                            style={{
                                                backgroundColor: '#e74c3c',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: 5,
                                                padding: '6px 12px',
                                                cursor: 'pointer',
                                                fontWeight: '600',
                                                fontSize: '0.9rem',
                                                transition: 'background-color 0.3s ease',
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#c0392b'}
                                            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#e74c3c'}
                                        >
                                            Usuń
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <button
                            onClick={() => setView('songs')}
                            style={{
                                marginTop: 30,
                                padding: '10px 25px',
                                borderRadius: 6,
                                border: 'none',
                                backgroundColor: '#5a7dee',
                                color: 'white',
                                fontSize: 16,
                                cursor: 'pointer',
                                fontWeight: '700',
                                boxShadow: '0 4px 10px rgba(90,125,238,0.4)',
                                transition: 'background-color 0.3s ease',
                            }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#4466cc'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#5a7dee'}
                        >
                            Powrót
                        </button>
                    </div>
                )}

                {toast.visible && (
                    <Toast message={toast.message} type={toast.type} onClose={hideToast}/>
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
                            <div
                                key={song._id || song.id}
                                className="ranking-item"
                                style={{
                                    marginBottom: '12px',
                                    paddingBottom: '6px',
                                    borderBottom: '1px solid #ddd',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s ease'
                                }}
                            >
                                <div
                                    className="ranking-title"
                                    style={{ fontWeight: '600', fontSize: '1rem' }}
                                >
                                    {index + 1}. {song.title}
                                </div>
                                {rankingExpanded && (
                                    <div className="ranking-details" style={{ fontSize: '0.9rem', color: '#555', marginTop: '4px' }}>
                                        <div>Artysta: {song.artist}</div>
                                        <div>Średnia ocen: {song.averageRating?.toFixed(1) || 'Brak'}</div>
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
