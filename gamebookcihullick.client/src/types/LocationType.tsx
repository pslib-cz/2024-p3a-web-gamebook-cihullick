import type { Image } from './ImageType';
export interface Location {
    locationID: number;
    name: string;
    description: string;
    imageID: Image;
}