export type InventoryItem = {
    itemID: number;
    quantity: number;
};

export type Player = {
    name: string;
    locationID: number | null;
    numberOfVisitedLocations: number;
    visitedLocations: number[];
    inventory: InventoryItem[];
    hunger: number;
    unlockedAchievements: number[];
    npcs: { [npcid: number]: { dialogStage: number } };
};

const PLAYER_KEY = 'player';

export const getPlayer = (): Player => {
    const playerData = localStorage.getItem(PLAYER_KEY);
    if (playerData) {
        const player = JSON.parse(playerData);

        return {
            name: player.name || 'Player1',
            locationID: player.locationID ?? null,
            numberOfVisitedLocations: player.numberOfVisitedLocations ?? 0,
            visitedLocations: player.visitedLocations || [],
            inventory: player.inventory || [],
            hunger: player.hunger ?? 100,
            unlockedAchievements: player.unlockedAchievements || [],
            npcs: player.npcs || {},
    };
        
    }
    return initializePlayer();
};
export const unlockAdventurerAchievement = (player: Player) => {
    if (!player) return;
    if (player?.numberOfVisitedLocations >= 3) {
        unlockAchievement(player, 1);
    }
};
export const unlockAchievement = (player: Player, achievementId: number) => {
    if (!player) return;
    if (!player.unlockedAchievements.includes(achievementId)) {
        player.unlockedAchievements.push(achievementId);
        savePlayer(player);
    }
};
export const clearPlayerData = () => {
    localStorage.removeItem('player');
    window.location.reload();
};

export const savePlayer = (player: Player): void => {
    localStorage.setItem(PLAYER_KEY, JSON.stringify(player));
};


export const visitLocation = (player: Player, locationID: number): void => {
    if (!player.visitedLocations.includes(locationID)) {
        player.visitedLocations.push(locationID);
        player.numberOfVisitedLocations = player.visitedLocations.length;
        savePlayer(player);
    }
};

// ITEM SHENANIGANS
export const addItemToInventory = (player: Player, itemID: number, quantity: number): void => {
    const existingItem = player.inventory.find((item) => item.itemID === itemID);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        player.inventory.push({ itemID, quantity });
    }

    savePlayer(player);
};


export const getItemQuantity = (player: Player, itemID: number): number => {
    const item = player.inventory.find((i) => i.itemID === itemID);
    return item ? item.quantity : 0;
};

export const removeItemFromInventory = (player: Player, itemID: number, quantity: number): boolean => {
    const itemIndex = player.inventory.findIndex((item) => item.itemID === itemID);

    if (itemIndex === -1) return false;

    const item = player.inventory[itemIndex];
    if (item.quantity > quantity) {
        item.quantity -= quantity;
    } else {
        player.inventory.splice(itemIndex, 1);
    }

    savePlayer(player);
    return true;
};


export const initializePlayer = (): Player => {
    const defaultPlayer: Player = {
        name: 'Player1',
        locationID: null,
        numberOfVisitedLocations: 0,
        visitedLocations: [],
        inventory: [],
        hunger: 100,
        unlockedAchievements: [],
        npcs: {},
    };
    savePlayer(defaultPlayer);
    return defaultPlayer;
};

