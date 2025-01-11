import type { Image } from './ImageType';
export interface NPC {
    npcid: number;
    name: string;
    requiredItemID: number | null;
    dialog: NPCDialogOption[]; 
    image: Image;
}
export interface NPCDialogOption {
    id: number;
    text: string;
    options: string[];
}