import React, { useState } from 'react';

const HamburgerMenu = ({ onLogout }) => {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => setOpen(prev => !prev);

    return (
        <div style={{ position: 'fixed', top: 20, left: 20, zIndex: 1000 }}>
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
                }}
            >
                ☰
            </button>

            <div
                style={{
                    maxHeight: open ? '120px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.4s ease',
                    background: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
                    marginTop: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    width: 120,
                }}
            >
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
