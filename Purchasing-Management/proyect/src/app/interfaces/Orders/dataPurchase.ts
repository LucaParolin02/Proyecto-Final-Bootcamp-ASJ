import { supplierInterface } from "../Suppliers/dataSuppliers"
import { statusInterface } from "./dataStatus";

export interface orderInterface {
    id?: number;
    created: Date;
    expected: Date;
    info: string;
    supplier: supplierInterface;
    status: statusInterface;
    total: number;
}

