export interface supplierInterface {
    code?: number;
    codeSupp?: string; 
    name: string;
    field: items;
    cuit: string;
    web?: string; 
    email: string;
    phone?: number; 
    street: string;
    number: string;
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

  export type items = 
    | 'Food'
    | 'Electronic'
    | 'Tools'
    | 'Jewelry'
    | 'Other'