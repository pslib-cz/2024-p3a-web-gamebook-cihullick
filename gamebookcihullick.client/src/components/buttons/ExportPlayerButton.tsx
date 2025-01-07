import React, { useEffect } from 'react';
import { unlockAdventurerAchievement, getPlayer} from '../../services/PlayerService';

const ExportPlayerButton: React.FC = () => {
    const player = getPlayer();

    useEffect(() => {
        unlockAdventurerAchievement(player)
    }, [player]);
    const handleExport = () => {
        
        if (!player) {
            alert('No player data found to export!');
            return;
        }
        const playerData = JSON.stringify(player, null, 2);
        const blob = new Blob([playerData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Washing_Machine_Quest_Player_Data.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button
            onClick={handleExport}
            style={{
                fontSize: '16px',
                padding: '10px 20px',
                margin: '10px',
                cursor: 'pointer',
                backgroundColor: '#008CBA',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
            }}
        >
            Export Player Data
        </button>
    );
};

export default ExportPlayerButton;
