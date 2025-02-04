import type { Image } from './ImageType';
export interface NPC {
    npcid: number;
    name: string;
    requiredItemID: number | null;
    dialog: NPCDialogOption[]; 
    image: Image;
    blockedLocationID: number;
    type: number;
}
export interface NPCDialogOption {
    id: number;
    text: string;
    options: string[];
}