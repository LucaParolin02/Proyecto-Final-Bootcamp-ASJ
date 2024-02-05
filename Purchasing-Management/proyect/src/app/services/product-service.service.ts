import { Injectable } from '@angular/core';
import { productsInterface } from '../interfaces/Products/dataProducts';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private URL_PRODUCTS = 'http://localhost:8080/products';

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<any> {
    return this.http.get(this.URL_PRODUCTS);
  }

  public getProduct(id: number): Observable<any> {
    return this.http.get(`${this.URL_PRODUCTS}/${id}`);
  }

  public addProduct(product: productsInterface): Observable<any> {
    return this.http.post(`${this.URL_PRODUCTS}/add`,product);
  }

  public deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.URL_PRODUCTS}/${id}`);
  }

  public updateProduct(id: number, updatedProduct: productsInterface): Observable<any> {
    return this.http.put(`${this.URL_PRODUCTS}/${id}`,updatedProduct);
  }

  public getProductsBySupplier(id: number): Observable<productsInterface[]> {
    return this.http.get<productsInterface[]>(`${this.URL_PRODUCTS}/supplier/${id}`);
  }

  public getCategories(): Observable<any> {
    return this.http.get(`${this.URL_PRODUCTS}/categories`)
  }
}
