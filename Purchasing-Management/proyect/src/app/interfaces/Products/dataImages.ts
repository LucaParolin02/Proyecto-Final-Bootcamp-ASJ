import { productsInterface } from "./dataProducts";

export interface imagesInterface {
    id?:number;
    url:string;
    product: productsInterface;
}