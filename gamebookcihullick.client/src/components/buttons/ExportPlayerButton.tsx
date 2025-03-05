import React, { useEffect } from 'react';
import {
    getPlayer,
    unlockAdventurerAchievement,
    unlockWinnerAchievement,
    unlockShopaholicAchievement,
    unlockYogurtAchievement,
    unlockBlackHoleAchievement,
    unlockServerAchievement,
} from '../../services/PlayerService';
import ButtonModule from '../buttons/button.module.css';

const ExportPlayerButton: React.FC = () => {
    const player = getPlayer();

    useEffect(() => {
        unlockAdventurerAchievement(player);
        unlockWinnerAchievement(player);
        unlockShopaholicAchievement(player);
        unlockYogurtAchievement(player);
        unlockBlackHoleAchievement(player);
        unlockServerAchievement(player);
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
        <button className={ButtonModule.btn} onClick={handleExport}>Export Player Data</button>
    );
};

export default ExportPlayerButton;