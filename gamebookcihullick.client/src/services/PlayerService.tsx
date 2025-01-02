export type InventoryItem = {
    itemID: number; // Matches ItemID in the database
    quantity: number; // How many of this item the player has
};

export type Player = {
    name: string;
    locationID: number | null;
    numberOfVisitedLocations: number;
    visitedLocations: number[];
    inventory: InventoryItem[]; // Updated to track structured inventory
    hunger: number;
    unlockedAchievements: number[];
};

const PLAYER_KEY = 'player';

// Retrieve the player from localStorage
export const getPlayer = (): Player => {
    const playerData = localStorage.getItem(PLAYER_KEY);
    if (playerData) {
        const player = JSON.parse(playerData);
        // Ensure all fields are initialized (fallback for older/incomplete data)
        return {
            name: player.name || 'Player1',
            locationID: player.locationID ?? null,
            numberOfVisitedLocations: player.numberOfVisitedLocations ?? 0,
            visitedLocations: player.visitedLocations || [],
            inventory: player.inventory || [],
            hunger: player.hunger ?? 100,
            unlockedAchievements: player.unlockedAchievements || [],
        };
    }
    return initializePlayer(); // Create and return a new player if none exists
};
export const unlockAdventurerAchievement = (player: Player) => {
    if (!player) return;
    if (player?.numberOfVisitedLocations >= 3) { // Adjust condition as per achievement requirements
        unlockAchievement(player, 1); // Unlock achievement with ID 1
    }
};
export const unlockAchievement = (player: Player, achievementId: number) => {
    if (!player) return;
    if (!player.unlockedAchievements.includes(achievementId)) {
        player.unlockedAchievements.push(achievementId);
        savePlayer(player); // Save updated player object
    }
};
export const clearPlayerData = () => {
    localStorage.removeItem('player');
    window.location.reload(); // Reload to reinitialize the player
};
// Save the updated player to localStorage
export const savePlayer = (player: Player): void => {
    localStorage.setItem(PLAYER_KEY, JSON.stringify(player));
};


export const visitLocation = (player: Player, locationID: number): void => {
    if (!player.visitedLocations.includes(locationID)) {
        player.visitedLocations.push(locationID); // Add the location ID if it's not already visited
        player.numberOfVisitedLocations = player.visitedLocations.length; // Update the count
        savePlayer(player); // Save the updated player object to localStorage
    }
};

// ITEM SHENANIGANS
export const addItemToInventory = (player: Player, itemID: number, quantity: number): void => {
    const existingItem = player.inventory.find((item) => item.itemID === itemID);

    if (existingItem) {
        // Update quantity if the item already exists
        existingItem.quantity += quantity;
    } else {
        // Add a new item to the inventory
        player.inventory.push({ itemID, quantity });
    }

    savePlayer(player); // Save updated player data
};


export const getItemQuantity = (player: Player, itemID: number): number => {
    const item = player.inventory.find((i) => i.itemID === itemID);
    return item ? item.quantity : 0;
};

export const removeItemFromInventory = (player: Player, itemID: number, quantity: number): boolean => {
    const itemIndex = player.inventory.findIndex((item) => item.itemID === itemID);

    if (itemIndex === -1) return false; // Item not found

    const item = player.inventory[itemIndex];
    if (item.quantity > quantity) {
        item.quantity -= quantity; // Reduce the quantity
    } else {
        // Remove the item if the quantity is depleted
        player.inventory.splice(itemIndex, 1);
    }

    savePlayer(player); // Save updated player data
    return true;
};


// Initialize a default player object
export const initializePlayer = (): Player => {
    const defaultPlayer: Player = {
        name: 'Player1',
        locationID: null,
        numberOfVisitedLocations: 0,
        visitedLocations: [], // Ensure this is initialized
        inventory: [],        // Ensure this is initialized
        hunger: 100,          // Example default value
        unlockedAchievements: [], // Ensure this is initialized
    };
    savePlayer(defaultPlayer); // Save the default player to localStorage
    return defaultPlayer;
};

