import { supplierInterface } from "./dataSuppliers";

export interface productsInterface  {
    sku?: number,
    nameProduct: string,
    supplier: supplierInterface,
    category: categories,
    description: string,
    amount: number,
    price: number
}


export type categories =
    | 'A'
    | 'B'
    | 'C'
    | 'D'
    | 'Other'