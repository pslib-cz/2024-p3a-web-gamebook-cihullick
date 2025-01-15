import React from 'react';
import { useNavigate } from 'react-router-dom';
import { initializePlayer, savePlayer } from '../../services/PlayerService';
import ButtonModule from '../buttons/button.module.css';

const NewGameButton: React.FC = () => {
    const navigate = useNavigate();

    const handleNewGame = async () => {
        try {
            localStorage.removeItem('player'); // Clear previous player data

            // Fetch blocked locations
            const blockedLocationsResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/NPCs/blocked-locations`);
            if (!blockedLocationsResponse.ok) {
                throw new Error(`Failed to fetch blocked locations: ${blockedLocationsResponse.statusText}`);
            }
            const blockedLocations = await blockedLocationsResponse.json();

            // Initialize player with blocked locations
            const player = initializePlayer(blockedLocations.map((loc: { blockedLocationID: number }) => loc.blockedLocationID));

            // Fetch all items for shop inventory
            const itemsResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/Items`);
            if (!itemsResponse.ok) {
                throw new Error(`Failed to fetch items: ${itemsResponse.statusText}`);
            }
            const items = await itemsResponse.json();

            // Populate shop inventory in player object
            player.shopInventory = items.map((item: { itemID: number }) => ({
                itemID: item.itemID,
                quantity: 50,
            }));

            savePlayer(player); // Save the updated player object
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
