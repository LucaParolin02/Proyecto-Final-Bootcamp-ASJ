import { categoryInterface } from "./dataCategories";
import { supplierInterface } from "../Suppliers/dataSuppliers";

export interface productsInterface  {
    id?: number;
    sku: string;
    name: string;
    supplier: Partial<supplierInterface>;
    category: Partial<categoryInterface>;
    desc: string;
    price: number;
}
