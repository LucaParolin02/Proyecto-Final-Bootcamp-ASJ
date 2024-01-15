import { categoryInterface } from "./dataCategories";
import { supplierInterface } from "./dataSuppliers";

export interface productsInterface  {
    sku?: number,
    nameProduct: string,
    supplier: supplierInterface,
    category: categoryInterface,
    description: string,
    price: number
}
