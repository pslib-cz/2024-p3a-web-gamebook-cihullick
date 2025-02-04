export type InventoryItem = {
    itemID: number;
    quantity: number;
    name: string;
    cost: number;
};
export type Player = {
    name: string;
    locationID: number | null;
    numberOfVisitedLocations: number;
    visitedLocations: number[];
    inventory: InventoryItem[];
    shopInventory: InventoryItem[];
    hunger: number;
    money: number;
    unlockedAchievements: number[];
    npcs: { [npcid: number]: { dialogStage: number } };
    blockedLocations: number[];
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
            shopInventory: player.shopInventory || [],
            hunger: player.hunger ?? 100,
            money: player.money ?? 10000,
            unlockedAchievements: player.unlockedAchievements || [],
            npcs: player.npcs || {},
            blockedLocations: player.blockedLocations || [],
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
export const addItemToInventory = ( player: Player, itemID: number, quantity: number, name: string, cost: number, target: 'player' | 'shop' = 'player'): void => {
    const inventory = target === 'player' ? player.inventory : player.shopInventory;
    const existingItem = inventory.find((item) => item.itemID === itemID);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        inventory.push({ itemID, quantity, name, cost});
    }

    savePlayer(player);
};

export const removeItemFromInventory = (player: Player, itemID: number, quantity: number,target: 'player' | 'shop' = 'player'): boolean => {
    const inventory = target === 'player' ? player.inventory : player.shopInventory;
    const itemIndex = inventory.findIndex((item) => item.itemID === itemID);

    if (itemIndex === -1) return false;

    const item = inventory[itemIndex];
    if (item.quantity > quantity) {
        item.quantity -= quantity;
    } else {
        inventory.splice(itemIndex, 1);
    }

    savePlayer(player);
    return true;
};
export const consumeItem = (player: Player, itemID: number, nutritionalValue: number): boolean => {
    const item = player.inventory.find(i => i.itemID === itemID);
    if (!item || item.quantity <= 0) return false;
    if (player.hunger == 1000) return false;
    player.hunger = Math.min(player.hunger + nutritionalValue, 1000);

    item.quantity -= 1;

    if (item.quantity === 0) {
        removeItemFromInventory(player, itemID, 1)
    }

    savePlayer(player);
    return true;
};
export const getItemQuantity = (player: Player, itemID: number): number => {
    const item = player.inventory.find((i) => i.itemID === itemID);
    return item ? item.quantity : 0;
};
export const removeBlockedLocation = (player: Player, locationID: number): boolean => {
    const locationIndex = player.blockedLocations.findIndex((id) => id === locationID);
    if (locationIndex === -1) {
        console.log(`Location ID ${locationID} not found in blockedLocations.`);
        return false;
    }
    player.blockedLocations.splice(locationIndex, 1);


    savePlayer(player);

    return true;
};
export const buyItem = (player: Player, itemID: number, quantity: number, name: string, itemCost: number): boolean => {
    const totalCost = itemCost * quantity;

    if (player.money < totalCost) {
        console.warn(`Not enough money. Player has ${player.money}, but needs ${totalCost}.`);
        return false;
    }
    player.money -= totalCost;
    addItemToInventory(player, itemID, quantity, name, itemCost, 'player');
    removeItemFromInventory(player, itemID, quantity, 'shop');
    savePlayer(player);
    console.log(`Item ${itemID} purchased. Quantity: ${quantity}. Total cost: ${totalCost}.`);
    return true;
};

export const initializePlayer = (blockedLocations: number[] = []): Player => {
    const defaultPlayer: Player = {
        name: 'Player1',
        locationID: null,
        numberOfVisitedLocations: 0,
        visitedLocations: [],
        inventory: [],
        shopInventory: [],
        hunger: 10,
        money: 10000,
        unlockedAchievements: [],
        npcs: {},
        blockedLocations,
    };
    savePlayer(defaultPlayer);
    return defaultPlayer;
};