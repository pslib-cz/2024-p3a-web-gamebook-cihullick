import type { Image } from './ImageType';

export interface Achievement {
    achievementID: number;
    name: string;
    description: string;
    imageID: Image;
}
