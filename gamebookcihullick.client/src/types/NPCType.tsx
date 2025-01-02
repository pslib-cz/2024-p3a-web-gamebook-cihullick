export interface NPC {
    npcID: number;
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