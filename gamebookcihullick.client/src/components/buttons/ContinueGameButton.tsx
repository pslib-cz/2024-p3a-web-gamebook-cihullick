import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPlayer } from '../../services/PlayerService';

const ContinueGameButton: React.FC = () => {
    const navigate = useNavigate();
    const [canContinue, setCanContinue] = useState(false);

    useEffect(() => {
        const player = getPlayer();
        if (player && player.locationID !== null) {
            setCanContinue(true);
        } else {
            setCanContinue(false);
        }
    }, []);


    const handleContinueGame = () => {
        const player = getPlayer();
        if (player?.locationID) {
            navigate(`/location/${player.locationID}`);
        }
    };

    return (
        <button
            onClick={handleContinueGame} disabled={!canContinue}
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
            Continue Game
        </button>
    );
};

export default ContinueGameButton;
