import { productsInterface } from "../Products/dataProducts";
import { orderInterface } from "./dataPurchase";

export interface detailInterface{
    id?: number;
    quantity: number;
    price: number;
    product: Partial<productsInterface>;
    order: Partial<orderInterface>;
}