import type { Image } from './ImageType';
import type { Connection } from './ConnectionType';
import type { NPC } from './NPCType';
import type { Inventory } from './InventoryType';

export interface Location {
    locationID: number;
    name: string;
    description: string;
    image: Image;
    connectedLocations: Connection[]; 
    npCs: NPC[]; // capital C for no reason, why swaggerrrrrrrrrrrrrrrrrrrrr
    inventories: Inventory[];
}
