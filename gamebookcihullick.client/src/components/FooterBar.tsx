import React from 'react';
import { getPlayer } from '../services/PlayerService';
import FooterBarModule from '../components/footerbar.module.css';

interface FooterBarProps {
    onOpenInventory: () => void;
}

const FooterBar: React.FC<FooterBarProps> = ({ onOpenInventory }) => {
    const player = getPlayer();

    return (
        <div className={FooterBarModule.player_stats}>
            <div className={FooterBarModule.player_stats_money}>
                <p>Purse: {player.money} F</p>
            </div>
            <div className={FooterBarModule.player_stats_money}>
                <p>Hunger: {player.hunger}</p>
            </div>
            <button className={FooterBarModule.player_stats_btn} onClick={onOpenInventory}>
                Open Inventory
            </button>
            <button className={FooterBarModule.player_stats_btn} onClick={() => window.history.back()}>
                Go Back
            </button>
        </div>
    );
};

export default FooterBar;
