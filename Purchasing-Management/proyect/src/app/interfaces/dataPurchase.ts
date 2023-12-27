import { productsInterface } from "./dataProducts"

export interface orderInterface {
    code?: number,
    date: Date,
    expectedDate: Date,
    status: boolean,
    info: string,
    product: productsInterface,
    amount: number,
    totalPrice: number
}