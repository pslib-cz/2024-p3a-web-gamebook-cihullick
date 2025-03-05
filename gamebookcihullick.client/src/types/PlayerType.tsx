import { ShopInventoryItem } from "../types"
export interface Player {
    name: string;
    locationID: number | null;
    numberOfVisitedLocations: number;
    visitedLocations: number[];
    inventory: ShopInventoryItem[];
    shopInventory: ShopInventoryItem[];
    shopMoney: number;
    shopWarehouse: ShopInventoryItem[];
    hunger: number;
    money: number;
    unlockedAchievements: number[];
    npcs: { [npcid: number]: { dialogStage: number } };
    blockedLocations: number[];
    totalSpent: number;
    customersServed: number;
};