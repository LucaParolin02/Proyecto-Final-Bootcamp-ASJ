import { supplierInterface } from "./dataSuppliers"

export interface orderInterface {
    code?: number,
    date: Date,
    expectedDate: Date,
    status: boolean,
    info: string,
    supplier: supplierInterface,
    products: productsList[],
    totalPrice: number
}

export interface productsList {
    id: number,
    name: string,
    price: number,
    quantity: number
}