import { supplierInterface } from "../Suppliers/dataSuppliers"
import { statusInterface } from "./dataStatus";

export interface orderInterface {
    id?: number;
    created: Date | string;
    expected: Date | string;
    info: string;
    supplier: Partial<supplierInterface>;
    status: Partial<statusInterface>;
    total: number;
}

