import type { Image } from './ImageType';
export interface Customer {
    customerID: number;
    name: string;
    budget: number;
    image: Image;
}