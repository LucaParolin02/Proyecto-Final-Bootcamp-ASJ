import { Injectable } from '@angular/core';
import { productsInterface } from '../interfaces/dataProducts';



@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private products: productsInterface[] = [];

  constructor() { }

  public getProducts(): productsInterface[] {
    return this.products;
  }

  public getProduct(code: number): productsInterface | undefined {
    return this.products.find(product => product.sku === code);
  }

  public addProduct(product: productsInterface) {
    if (this.products.length > 0) {
      const lastProduct = this.products[this.products.length - 1];
      if (lastProduct.sku!== undefined){
        product.sku = lastProduct.sku + 1;
      }
    }else {
      product.sku = 0;
    }
    this.products.push(product);
  }

  public deleteProduct(code: number): void {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].sku === code) {
        this.products.splice(i, 1);
        break;
      }
    }
  }

  public updateProduct(updatedProduct: productsInterface): void {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].sku === updatedProduct.sku) {
        this.products[i] = updatedProduct;
        break;
      }
    }
  }

}
