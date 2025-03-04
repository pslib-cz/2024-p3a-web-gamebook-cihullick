import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPlayer } from '../../services/PlayerService';
import ButtonModule from '../buttons/button.module.css';

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
        <button className={ButtonModule.btn} onClick={handleContinueGame} disabled={!canContinue}>Continue Game</button>
    );
};

export default ContinueGameButton;
