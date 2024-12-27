import React from 'react';
import { clearPlayerData, getPlayer } from '../services/PlayerService';
import BackButton from '../components/buttons/BackButton';

const PlayerDebug: React.FC = () => {
    const player = getPlayer(); // Retrieve the player object from localStorage

    return (
        <div>
            <h1>Player Debug Page</h1>
            <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '5px', color: 'black' }}>
                {JSON.stringify(player, null, 2)}
            </pre>
            <button onClick={clearPlayerData}>Reset Player</button>
            <BackButton />
        </div>
    );
};

export default PlayerDebug;
