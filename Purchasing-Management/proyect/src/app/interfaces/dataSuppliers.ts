export interface supplierInterface {
    code?: number,
    name: string,
    field: string,
    cuit: string,
    email: string,
    addres: string,
    iva: ivaOptions,
}

export type ivaOptions =
    | 'IVA Responsable Inscripto'
    | 'IVA Responsable no Inscripto'
    | 'Monotributista Social'
    | 'Proveedor del Exterior'
    | 'Other'
