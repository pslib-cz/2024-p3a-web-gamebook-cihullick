import type { Image } from './ImageType';
export interface Item {
    itemID: number;
    name: string;
    description: string;
    cost: string;
    isEdible: boolean;
    showsInInventory: boolean;
    type: string;
    nutritionalValue: number;
    image: Image;
}