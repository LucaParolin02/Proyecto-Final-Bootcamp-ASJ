import { contactInterface } from "./dataContact";
import { provinceInterface } from "./dataProvince";
import { sectorInterface } from "./dataSector";
import { vatInterface } from "./dataVat";

export interface supplierInterface {
    id?: number;
    code: string; 
    logo?: string,
    name: string;
    cuit: string;
    web?: string; 
    email: string;
    phone: string; 
    street?: string;
    snumber?: string;
    zip: string;
    city: string;
    contact: contactInterface;
    vatCondition: vatInterface;
    sector: sectorInterface;
    province: provinceInterface;
  }
  
  
  