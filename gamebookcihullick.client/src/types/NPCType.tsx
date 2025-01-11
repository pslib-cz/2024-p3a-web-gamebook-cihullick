import type { Image } from './ImageType';
export interface NPC {
    npcid: number;
    name: string;
    requiredItemID: number | null;
    dialog: NPCDialogOption[]; 
    imageID: Image;
}
export interface NPCDialogOption {
    id: number;
    text: string;
    options: string[];
}