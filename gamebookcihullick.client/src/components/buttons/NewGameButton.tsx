import React from 'react';
import { useNavigate } from 'react-router-dom';
import { initializePlayer } from '../../services/PlayerService';

const NewGameButton: React.FC = () => {
    const navigate = useNavigate();

    const handleNewGame = () => {
        localStorage.removeItem('player');
        initializePlayer();
        navigate('/location/1');
    };

    return (
        <button
            onClick={handleNewGame}
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
