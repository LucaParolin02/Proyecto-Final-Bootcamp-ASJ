import { productsInterface } from "./dataProducts"
import { supplierInterface } from "./dataSuppliers"

export interface orderInterface {
    code?: number,
    date: Date,
    expectedDate: Date,
    status: boolean,
    info: string,
    supplier: supplierInterface,
    products: productsInterface[],
    totalPrice: number
}

