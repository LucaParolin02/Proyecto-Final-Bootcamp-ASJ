import { Injectable } from '@angular/core';
import { orderInterface } from '../interfaces/Orders/dataPurchase';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { detailInterface } from '../interfaces/Orders/dataDetail';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderServiceService {

  private URL_ORDERS = 'http://localhost:8080/orders';

  constructor(private http: HttpClient) { }

  public getOrders(): Observable<orderInterface[]> {
    return this.http.get<orderInterface[]>(this.URL_ORDERS);
  }

  public getOrder(id: number): Observable<orderInterface | undefined> {
    return this.http.get<orderInterface>(`${this.URL_ORDERS}/${id}`);
  }

  public addOrder(order: orderInterface): Observable<any> {
    return this.http.post(`${this.URL_ORDERS}/add`, order);
  }

  public deleteOrder(id: number): Observable<any> {
    return this.http.delete(`${this.URL_ORDERS}/${id}`)
  }

  public cancelOrder(id: number, order: orderInterface ): Observable<any> {
    return this.http.put(`${this.URL_ORDERS}/${id}`, order)
  }

  public updateOrder(id:number,updatedOrder: orderInterface): Observable<any> {
    return this.http.put(`${this.URL_ORDERS}/${id}`,updatedOrder)
  }

  public addDetail(detail: detailInterface): Observable<any>{
    return this.http.post(`${this.URL_ORDERS}/details/add`, detail)
  }

  public getDetailsByOrder(id:number): Observable<any>{
    return this.http.get(`${this.URL_ORDERS}/details/${id}`)
  }

  public addDetails(details: detailInterface[]): Observable<any>{
    return this.http.post(`${this.URL_ORDERS}/details/add/list`, details)
  }

  public getStatus(): Observable<any>{
    return this.http.get(`${this.URL_ORDERS}/status`)
  }

}
