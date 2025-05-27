import React, { useState } from 'react';

const HamburgerMenu = ({ onLogout, isAdmin, onAdminPanelClick, onContactClick }) => {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => setOpen(prev => !prev);

    return (
        <div style={{ position: 'relative', zIndex: 1000 }}>
            <button
                onClick={toggleMenu}
                aria-label="Menu"
                style={{
                    fontSize: '28px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    userSelect: 'none',
                    transition: 'transform 0.3s ease',
                    transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
                    color: '#333',
                }}
            >
                ☰
            </button>

            <div
                style={{
                    maxHeight: open ? '160px' : '0', // większy gdy admin
                    overflow: 'hidden',
                    transition: 'max-height 0.4s ease',
                    background: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
                    marginTop: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    width: 120,
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                }}
            >
                {/* Przycisk kontakt */}
                <button
                    onClick={() => {
                        onContactClick();
                        setOpen(false);
                    }}
                    style={{
                        padding: '10px',
                        border: 'none',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        borderRadius: 6,
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '16px',
                        margin: '10px',
                        boxShadow: '0 4px 10px rgba(76,175,80,0.4)',
                        transition: 'background-color 0.3s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#388E3C'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#4CAF50'}
                >
                    Kontakt
                </button>


                {isAdmin && (
                    <button
                        onClick={() => {
                            onAdminPanelClick && onAdminPanelClick();
                            setOpen(false);
                        }}
                        style={{
                            padding: '10px',
                            border: 'none',
                            backgroundColor: '#007bff',
                            color: 'white',
                            borderRadius: 6,
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '15px',
                            margin: '10px',
                            textalign: 'center',
                            boxShadow: '0 4px 10px rgba(0,123,255,0.4)',
                            transition: 'background-color 0.3s ease',
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0056b3'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#007bff'}
                    >
                        AdminPanel
                    </button>
                )}

               
                <button
                    onClick={() => {
                        onLogout();
                        setOpen(false);
                    }}
                    style={{
                        padding: '10px',
                        border: 'none',
                        backgroundColor: '#ff4d4f',
                        color: 'white',
                        borderRadius: 6,
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '16px',
                        margin: '10px',
                        boxShadow: '0 4px 10px rgba(255,77,79,0.4)',
                        transition: 'background-color 0.3s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#d9363e'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ff4d4f'}
                >
                    Wyloguj
                </button>
            </div>
        </div>
    );
};

export default HamburgerMenu;
