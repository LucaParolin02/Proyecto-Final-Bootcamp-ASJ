import { Injectable } from '@angular/core';
import { productsInterface } from '../interfaces/Products/dataProducts';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private products: productsInterface[] = [];
  private URL_PRODUCTS = 'http://localhost:8080/products';

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<any> {
    return this.http.get(this.URL_PRODUCTS);
  }

  public getProduct(id: number): Observable<productsInterface | undefined> {
    return of(this.products.find(product => product.id === id));
  }

  public addProduct(product: productsInterface): Observable<void> {
    return new Observable<void>(observer => {
      if (this.products.length > 0) {
        const lastProduct = this.products[this.products.length - 1];
        if (lastProduct.sku !== undefined) {
          product.sku = lastProduct.sku + 1;
        }
      } else {
        product.id = 0;
      }
      this.products.push(product);
      observer.next();
      observer.complete();
    });
  }

  public deleteProduct(id: number): Observable<void> {
    return new Observable<void>(observer => {
      const index = this.products.findIndex(product => product.id === id);
      if (index !== -1) {
        this.products.splice(index, 1);
      }
      observer.next();
      observer.complete();
    });
  }

  public updateProduct(updatedProduct: productsInterface): Observable<void> {
    return new Observable<void>(observer => {
      const index = this.products.findIndex(product => product.sku === updatedProduct.sku);
      if (index !== -1) {
        this.products[index] = updatedProduct;
      }
      observer.next();
      observer.complete();
    });
  }

  public getProductsBySupplier(supplierName: string): Observable<productsInterface[]> {
    const filteredProducts = this.products.filter(product => product.supplier.name === supplierName);
    return of(filteredProducts);
  }
}
