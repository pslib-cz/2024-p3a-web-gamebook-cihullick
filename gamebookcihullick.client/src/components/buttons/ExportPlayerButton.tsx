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
        const playerData = JSON.stringify(player, null, 2); // Convert player object to formatted JSON
        const blob = new Blob([playerData], { type: 'application/json' }); // Create a JSON file blob
        const url = URL.createObjectURL(blob); // Create a download link
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Washing_Machine_Quest_Player_Data.json'; // Set the file name
        document.body.appendChild(link);
        link.click(); // Trigger the download
        document.body.removeChild(link); // Clean up
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
