import { categoryInterface } from "./dataCategories";
import { supplierInterface } from "./dataSuppliers";

export interface productsInterface  {
    id?: number;
    sku?: number,
    nameProduct: string,
    supplier: supplierInterface,
    category: categoryInterface,
    description: string,
    price: number,
}

export interface TempProduct {
    id: number;
    sku?: number,
    nameProduct: string,
    supplier: supplierInterface,
    category: categoryInterface,
    description: string,
    price: number;
    quantity: number;
  }