const PLAYER_KEY = 'player';

// rescue the player from localstorage
export const getPlayer = () => {
    const player = localStorage.getItem(PLAYER_KEY);
    return player ? JSON.parse(player) : null;
};

// set the players current location in the localstorage
export const setPlayerLocation = (locationID: number) => {
    const player = getPlayer() || { name: 'Player1', locationID: null }; // Default player object
    player.locationID = locationID;
    localStorage.setItem(PLAYER_KEY, JSON.stringify(player));
};

// get the current location id
export const getPlayerLocation = (): number | null => {
    const player = getPlayer();
    return player ? player.locationID : null;
};
