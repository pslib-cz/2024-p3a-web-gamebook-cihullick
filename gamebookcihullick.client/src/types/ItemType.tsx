import type { Image } from './ImageType';
export interface Item {
    itemID: number;
    name: string;
    description: string;
    cost: string;
    IsEdible: boolean;
    nutritionalValue: number;
    imageID: Image;
}