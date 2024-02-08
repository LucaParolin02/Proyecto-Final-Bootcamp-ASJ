import { Injectable } from '@angular/core';
import { productsInterface } from '../interfaces/Products/dataProducts';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { categoryInterface } from '../interfaces/Products/dataCategories';
import { imagesInterface } from '../interfaces/Products/dataImages';

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
    return this.http.get(`${this.URL_PRODUCTS}/categories`);
  }

  public getImagesByProd(id: number): Observable<any>{
    return this.http.get(`${this.URL_PRODUCTS}/images/${id}`);
  }

  public getImages(): Observable<any>{
    return this.http.get(`${this.URL_PRODUCTS}/images`);
  }

  public getImage(id:number): Observable<any>{
    return this.http.get(`${this.URL_PRODUCTS}/image/${id}`)
  }

  public getAllImages(): Observable<any>{
    return this.http.get(`${this.URL_PRODUCTS}/images/all`);
  }

  public getDeletedProducts(): Observable<any>{
    return this.http.get(`${this.URL_PRODUCTS}/deleted`);
  }

  public getDeletedCategories(): Observable<any>{
    return this.http.get(`${this.URL_PRODUCTS}/deleted/categories`);
  }

  public getDeletedImagesByProd(id:number): Observable<any>{
    return this.http.get(`${this.URL_PRODUCTS}/deleted/images/${id}`);
  }

  public restoreProduct(id: number): Observable<productsInterface>{
    return this.http.put<productsInterface>(`${this.URL_PRODUCTS}/restore/${id}`, {});
  }

  public restoreImage(id: number): Observable<imagesInterface>{
    return this.http.put<imagesInterface>(`${this.URL_PRODUCTS}/restore/image/${id}`, {})
  }

  public getCategoryById(id: number): Observable<categoryInterface>{
    return this.http.get<categoryInterface>(`${this.URL_PRODUCTS}/category/${id}`);
  }

  public addCategory(category: categoryInterface): Observable<categoryInterface>{
    return this.http.post<categoryInterface>(`${this.URL_PRODUCTS}/categories/add`, category);
  }

  public deleteCategory(id:number): Observable<any>{
    return this.http.delete(`${this.URL_PRODUCTS}/categories/${id}`);
  }

  public editCategory(id:number, category: categoryInterface): Observable<any>{
    return this.http.put(`${this.URL_PRODUCTS}/categories/${id}`, category);
  }

  public restoreCategory(id:number): Observable<any>{
    return this.http.put(`${this.URL_PRODUCTS}/restore/category/${id}`, {});
  }

  public addImage(image: imagesInterface): Observable<imagesInterface>{
    return this.http.post<imagesInterface>(`${this.URL_PRODUCTS}/image/add`, image);
  }

  public deleteImage(id:number): Observable<any>{
    return this.http.delete(`${this.URL_PRODUCTS}/image/${id}`);
  }

  public editImage(id:number, image: imagesInterface): Observable<any>{
    return this.http.put(`${this.URL_PRODUCTS}/image/${id}`,image);
  }
}
