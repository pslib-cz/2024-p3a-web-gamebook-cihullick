import React from 'react';
import { getPlayer } from '../services/PlayerService';
import InventoryModule from '../components/inventory.module.css';

interface FooterBarProps {
    onOpenInventory: () => void; // Function to toggle inventory
}

const FooterBar: React.FC<FooterBarProps> = ({ onOpenInventory }) => {
    const player = getPlayer();

    return (
        <div className={InventoryModule.footer}>
            <div className={InventoryModule.backbeans}>
                <button onClick={() => window.history.back()}>Back</button>
            </div>
            <div className={InventoryModule.player_stats}>
                <div className={InventoryModule.player_stats_money}>
                    <p>Purse: {player.money} F</p>
                </div>
                <button className={InventoryModule.player_stats_inv} onClick={onOpenInventory}>
                    Open Inventory
                </button>
            </div>
        </div>
    );
};

export default FooterBar;
