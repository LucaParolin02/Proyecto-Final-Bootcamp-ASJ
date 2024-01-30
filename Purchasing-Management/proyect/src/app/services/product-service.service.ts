import { Injectable } from '@angular/core';
import { productsInterface } from '../interfaces/dataProducts';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private products: productsInterface[] = [];

  constructor() { }

  public getProducts(): Observable<productsInterface[]> {
    return of(this.products);
  }

  public getProduct(code: number): Observable<productsInterface | undefined> {
    return of(this.products.find(product => product.sku === code));
  }

  public addProduct(product: productsInterface): Observable<void> {
    return new Observable<void>(observer => {
      if (this.products.length > 0) {
        const lastProduct = this.products[this.products.length - 1];
        if (lastProduct.sku !== undefined) {
          product.sku = lastProduct.sku + 1;
        }
      } else {
        product.sku = 0;
      }
      this.products.push(product);
      observer.next();
      observer.complete();
    });
  }

  public deleteProduct(code: number): Observable<void> {
    return new Observable<void>(observer => {
      const index = this.products.findIndex(product => product.sku === code);
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
