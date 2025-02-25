import type { Image } from './ImageType';

export interface Cutscene {
    cutsceneID: number;
    name: string;
    text: string;
    image: Image;
    nextCutsceneID: number;
}