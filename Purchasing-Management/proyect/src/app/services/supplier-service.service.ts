import { Injectable } from '@angular/core';
import { proveedores } from '../data/dataSuppliers';

@Injectable({
  providedIn: 'root'
})
export class SupplierServiceService {
  
  constructor() { }

  getSuppliers(): any[] {
    return proveedores;
  }
}