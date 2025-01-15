import type { Image } from './ImageType';
export interface Inventory {
    inventoryID: number;
    name: string;
    type: number;
    image: Image;
    locationID: number;
}