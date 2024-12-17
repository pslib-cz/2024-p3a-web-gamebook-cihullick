// src/services/PlayerService.ts

const PLAYER_KEY = 'player';

// Function to get the Player object from localStorage
export const getPlayer = () => {
    const player = localStorage.getItem(PLAYER_KEY);
    return player ? JSON.parse(player) : null;
};

// Function to set the Player's current location in localStorage
export const setPlayerLocation = (locationID: number) => {
    const player = getPlayer() || { name: 'Player1', locationID: null }; // Default player object
    player.locationID = locationID;
    localStorage.setItem(PLAYER_KEY, JSON.stringify(player));
};

// Function to retrieve the Player's current location ID
export const getPlayerLocation = (): number | null => {
    const player = getPlayer();
    return player ? player.locationID : null;
};
