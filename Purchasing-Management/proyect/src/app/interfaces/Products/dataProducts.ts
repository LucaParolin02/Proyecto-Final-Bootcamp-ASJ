import { categoryInterface } from "./dataCategories";
import { supplierInterface } from "../Suppliers/dataSuppliers";

export interface productsInterface  {
    id?: number;
    sku: string;
    name: string;
    supplier: supplierInterface;
    category: categoryInterface;
    description: string;
    price: number;
}
