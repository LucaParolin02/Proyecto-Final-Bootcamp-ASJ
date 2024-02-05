import { Injectable } from '@angular/core';
import { supplierInterface } from '../interfaces/Suppliers/dataSuppliers';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { contactInterface } from '../interfaces/Suppliers/dataContact';


@Injectable({
  providedIn: 'root'
})
export class SupplierServiceService {

  private URL_SUPPLIERS = 'http://localhost:8080/suppliers';

  constructor(private http: HttpClient) { }

  public getSuppliers(): Observable<any> {
    return this.http.get(this.URL_SUPPLIERS);
  }

  public getSupplier(id: number): Observable<any> {
    return this.http.get(`${this.URL_SUPPLIERS}/${id}`)
  }

  public addSupplier(supplier: supplierInterface): Observable<any> {
    return this.http.post(`${this.URL_SUPPLIERS}/add`,supplier)
  }

  public deleteSupplier(id: number): Observable<any> {
    return this.http.delete(`${this.URL_SUPPLIERS}/${id}`)
  }

  public updateSupplier(id: number,updatedSupplier: supplierInterface): Observable<any> {
    return this.http.put(`${this.URL_SUPPLIERS}/${id}`, updatedSupplier)
  }

  public getCountries(): Observable<any>{
    return this.http.get(`${this.URL_SUPPLIERS}/countries`);
  }

  public getStates(id: number): Observable<any>{
    return this.http.get(`${this.URL_SUPPLIERS}/provinces/${id}`);
  }

  public getSectors(): Observable<any>{
    return this.http.get(`${this.URL_SUPPLIERS}/sectors`);
  }
  //TEMRIANR CRUD SECTOR

  public getVats(): Observable<any>{
    return this.http.get(`${this.URL_SUPPLIERS}/vats`);
  }

  public getContact(id: number): Observable<any>{
    return this.http.get(`${this.URL_SUPPLIERS}/contact/${id}`);
  }

  public addContact(contact: contactInterface): Observable<any>{
    return this.http.post(`${this.URL_SUPPLIERS}/contact/add`, contact);
  }

  public editContact(id: number, contact: contactInterface): Observable<contactInterface>{
    return this.http.put<contactInterface>(`${this.URL_SUPPLIERS}/contact/edit/${id}`, contact)
  }
}