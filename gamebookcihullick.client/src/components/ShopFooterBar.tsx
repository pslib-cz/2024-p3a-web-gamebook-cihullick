import React from 'react';
import { getPlayer } from '../services/PlayerService';
import FooterBarModule from '../components/footerbar.module.css';
import { useNavigate } from 'react-router-dom';

interface ShopFooterBarProps {
    onOpenInventory: () => void;
}

const ShopFooterBar: React.FC<ShopFooterBarProps> = ({ onOpenInventory }) => {
    const player = getPlayer();
    const navigate = useNavigate();

    if (player.hunger === 0) { navigate('/death') }

    return (
        <div className={FooterBarModule.player_stats}>
            <div className={FooterBarModule.player_stats_money}>
                <p>Shop Budget: {player.shopMoney} F</p>
            </div>
            <div className={FooterBarModule.player_stats_money}>
                <p>Hunger: {player.hunger}</p>
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
