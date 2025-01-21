import React from 'react';
import { useNavigate } from 'react-router-dom';
import { initializePlayer, savePlayer } from '../../services/PlayerService';
import ButtonModule from '../buttons/button.module.css';

const NewGameButton: React.FC = () => {
    const navigate = useNavigate();

    const handleNewGame = async () => {
        try {
            localStorage.removeItem('player');

            const blockedLocationsResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/NPCs/blocked-locations`);
            if (!blockedLocationsResponse.ok) {
                throw new Error(`Failed to fetch blocked locations: ${blockedLocationsResponse.statusText}`);
            }
            const blockedLocations = await blockedLocationsResponse.json();

            const player = initializePlayer(blockedLocations.map((loc: { blockedLocationID: number }) => loc.blockedLocationID));

            const itemsResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/Items`);
            if (!itemsResponse.ok) {
                throw new Error(`Failed to fetch items: ${itemsResponse.statusText}`);
            }
            const items = await itemsResponse.json();

            player.shopInventory = items.map((item: { itemID: number, name: string, cost: number }) => ({
                itemID: item.itemID,
                quantity: 50,
                name: item.name,
                cost: item.cost,
            }));

            savePlayer(player);
            navigate('/location/1');
        } catch (error) {
            console.error('Error initializing new game:', error);
        }
    };



    return (
        <button className={ButtonModule.btn} onClick={handleNewGame}>
            New Game
        </button>
    );
};

export default NewGameButton;
