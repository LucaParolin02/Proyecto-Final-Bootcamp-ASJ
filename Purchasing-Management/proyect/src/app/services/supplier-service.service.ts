import { Injectable } from '@angular/core';
import { supplierInterface } from '../interfaces/dataSuppliers';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SupplierServiceService {

  private suppliers: supplierInterface[] = [];
  
  private URL_API_COUNTRIES: string = "assets/data/countries.json";
  private URL_API_STATES: string = "assets/data/states.json";
  private URL_API_CITIES: string = "assets/data/cities.json";

  constructor(private http: HttpClient) { }

  public getSuppliers(): Observable<supplierInterface[]> {
    return of(this.suppliers);
  }

  public getSupplier(id: number): Observable<supplierInterface> {
    return of(this.suppliers.find(supplier => supplier.id === id) || {} as supplierInterface);
  }

  public addSupplier(supplier: supplierInterface): Observable<any> {
    if (this.suppliers.length > 0) {
      const lastSupplier = this.suppliers[this.suppliers.length - 1];
      if (lastSupplier.id !== undefined){
        supplier.id = lastSupplier.id + 1;
      }
    } else {
      supplier.id = 0;
    }
    this.suppliers.push(supplier);
    return of(undefined);
  }

  public deleteSupplier(code: number): Observable<any> {
    const index = this.suppliers.findIndex(supplier => supplier.id === code);
    if (index !== -1) {
      this.suppliers.splice(index, 1);
    }
    return of(undefined);
  }

  public updateSupplier(updatedSupplier: supplierInterface): Observable<any> {
    const index = this.suppliers.findIndex(supplier => supplier.id === updatedSupplier.id);
    if (index !== -1) {
      this.suppliers[index] = updatedSupplier;
    }
    return of(undefined);
  }

  public getCountries(): Observable<any>{
    return this.http.get(this.URL_API_COUNTRIES);
  }

  public getStates(): Observable<any>{
    return this.http.get(this.URL_API_STATES);
  }

  public getCities(): Observable<any>{
    return this.http.get(this.URL_API_CITIES);

  }

}