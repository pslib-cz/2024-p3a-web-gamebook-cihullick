import React from 'react';
import { getPlayer } from '../services/PlayerService';
import FooterBarModule from '../components/footerbar.module.css';

interface ShopFooterBarProps {
    onOpenInventory: () => void; // Function to toggle inventory
}

const ShopFooterBar: React.FC<ShopFooterBarProps> = ({ onOpenInventory }) => {
    const player = getPlayer();

    return (
        <div className={FooterBarModule.player_stats}>
            <div className={FooterBarModule.player_stats_money}>
                <p>Shop Budget: {player.shopMoney} F</p>
            </div>
            <button className={FooterBarModule.player_stats_btn} onClick={onOpenInventory}>
                Open Shop Inventory
            </button>
            <button className={FooterBarModule.player_stats_btn} onClick={() => window.history.back()}>
                Go Back
            </button>
        </div>
    );
};

export default ShopFooterBar;
