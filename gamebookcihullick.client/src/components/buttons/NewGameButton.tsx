import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addItemToInventory, initializePlayer, savePlayer } from '../../services/PlayerService';
import ButtonModule from '../buttons/button.module.css';

const NewGameButton: React.FC = () => {
    const navigate = useNavigate();

    const handleNewGame = async () => {
        localStorage.removeItem('player');
        const blockedLocationsResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/NPCs/blocked-locations`);
        const blockedLocations = await blockedLocationsResponse.json();
        const player = initializePlayer(blockedLocations.map((blockedlocation: { blockedLocationID: number }) => blockedlocation.blockedLocationID));
        const itemsResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/Items`);
        const items = await itemsResponse.json();
        for (let i = 0; i <= items.length - 1; i++) {
            if (items[i].showsInInventory == false) {
               items.splice(i, 1);
            }
        }
        player.shopInventory = items.map((item: { itemID: number, name: string, cost: number, showsInInventory: boolean }) => ({
            itemID: item.itemID, quantity: 25, name: item.name, cost: item.cost, showsInInventory: item.showsInInventory,
        }));
        addItemToInventory(player, 16, 1, "Dirty clothes", 0);
        savePlayer(player);
        navigate('/cutscene/1');
    };

    return (
        <button className={ButtonModule.btn} onClick={handleNewGame}>New Game</button>
    );
};

export default NewGameButton;
