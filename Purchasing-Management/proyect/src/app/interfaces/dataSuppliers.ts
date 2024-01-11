import { sectorInterface } from "./dataSectors";

export interface supplierInterface {
    code?: number;
    codeSupp?: string; 
    name: string;
    sectors: sectorInterface;
    cuit: string;
    web?: string; 
    email: string;
    phone?: number | undefined; 
    street: string;
    number: number;
    postalCode: string;
    city: string;
    province: string;
    country: string;
    iva: IvaOptions;
  }
  
  export type IvaOptions =
    | 'IVA Responsable Inscripto'
    | 'IVA Responsable no Inscripto'
    | 'Monotributista Social'
    | 'Proveedor del Exterior'
    | 'Other';