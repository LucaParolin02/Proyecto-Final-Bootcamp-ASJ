import { Injectable } from '@angular/core';
import { supplierInterface } from '../interfaces/dataSuppliers';


@Injectable({
  providedIn: 'root'
})
export class SupplierServiceService {

  private suppliers: supplierInterface[] = [];

  constructor() { }

  public getSuppliers(): supplierInterface[] {
    return this.suppliers;
  }

  public addSupplier(supplier: supplierInterface) {
    supplier.code = this.suppliers.length;
    this.suppliers.push(supplier);
  }

  public deleteSupplier(code: number): void {
    for (let i = 0; i < this.suppliers.length; i++) {
      if (this.suppliers[i].code === code) {
        this.suppliers.splice(i, 1);
      }
    }
  }
}