export interface NPC {
    npcid: number;
    name: string;
    requiredItemID: number | null;
    dialog: NPCDialogOption[]; 
    image: string;
}
export interface NPCDialogOption {
    id: number;
    text: string;
    options: string[];
}