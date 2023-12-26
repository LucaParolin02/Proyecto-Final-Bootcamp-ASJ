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

  public getSupplier(code: number): supplierInterface | undefined {
    return this.suppliers.find(supplier => supplier.code === code);
  }

  public addSupplier(supplier: supplierInterface) {
    if (this.suppliers.length > 0) {
      const lastSupplier = this.suppliers[this.suppliers.length - 1];
      if (lastSupplier.code !== undefined){
        supplier.code = lastSupplier.code + 1;
      }
    }else {
      supplier.code = 0;
    }
    this.suppliers.push(supplier);
  }

  public deleteSupplier(code: number): void {
    for (let i = 0; i < this.suppliers.length; i++) {
      if (this.suppliers[i].code === code) {
        this.suppliers.splice(i, 1);
        break;
      }
    }
  }

  public updateSupplier(updatedSupplier: supplierInterface): void {
    for (let i = 0; i < this.suppliers.length; i++) {
      if (this.suppliers[i].code === updatedSupplier.code) {
        this.suppliers[i] = updatedSupplier;
        break;
      }
    }
  }

}