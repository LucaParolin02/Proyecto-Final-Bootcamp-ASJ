import { Injectable } from '@angular/core';
import { orderInterface } from '../interfaces/dataPurchase';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderServiceService {

  private orders: orderInterface[] = [];

  constructor() { }

  public getOrders(): Observable<orderInterface[]> {
    return of(this.orders);
  }

  public getOrder(code: number): Observable<orderInterface | undefined> {
    return of(this.orders.find(order => order.code === code));
  }

  public addOrder(order: orderInterface): Observable<void> {
    return new Observable<void>(observer => {
      if (this.orders.length > 0) {
        const lastOrder = this.orders[this.orders.length - 1];
        if (lastOrder.code !== undefined) {
          order.code = lastOrder.code + 1;
        }
      } else {
        order.code = 0;
      }
      order.status = true;
      this.orders.push(order);
      observer.next();
      observer.complete();
    });
  }

  public cancelOrder(code: number): Observable<void> {
    return new Observable<void>(observer => {
      for (let i = 0; i < this.orders.length; i++) {
        if (this.orders[i].code === code) {
          this.orders[i].status = false;
          observer.next();
          observer.complete();
          break;
        }
      }
    });
  }

  public updateOrder(updatedOrder: orderInterface): Observable<void> {
    return new Observable<void>(observer => {
      for (let i = 0; i < this.orders.length; i++) {
        if (this.orders[i].code === updatedOrder.code) {
          this.orders[i] = updatedOrder;
          observer.next();
          observer.complete();
          break;
        }
      }
    });
  }
}
