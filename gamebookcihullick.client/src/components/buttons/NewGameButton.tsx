import React from 'react';
import { useNavigate } from 'react-router-dom';
import { initializePlayer } from '../../services/PlayerService';

const NewGameButton: React.FC = () => {
    const navigate = useNavigate();

    const handleNewGame = () => {
        localStorage.removeItem('player'); // Clear any existing player data
        initializePlayer(); // Reinitialize a new player
        navigate('/location/1'); // Start at the first location
    };

    return (
        <button
            onClick={handleNewGame} // -1 navigates to the previous page in history
            style={{
                fontSize: '16px',
                padding: '10px 20px',
                margin: '10px',
                cursor: 'pointer',
                backgroundColor: '#555',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
            }}
        >
            New Game
        </button>
    );
};

export default NewGameButton;
