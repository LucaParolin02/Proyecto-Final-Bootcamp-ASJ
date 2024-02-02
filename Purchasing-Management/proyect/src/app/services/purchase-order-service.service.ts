import { Injectable } from '@angular/core';
import { orderInterface } from '../interfaces/Orders/dataPurchase';
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

  public getOrder(id: number): Observable<orderInterface | undefined> {
    return of(this.orders.find(order => order.id === id));
  }

  public addOrder(order: orderInterface): Observable<void> {
    return new Observable<void>(observer => {
      if (this.orders.length > 0) {
        const lastOrder = this.orders[this.orders.length - 1];
        if (lastOrder.id !== undefined) {
          order.id = lastOrder.id + 1;
        }
      } else {
        order.id = 0;
      }
      order.status.name = "";
      this.orders.push(order);
      observer.next();
      observer.complete();
    });
  }

  public cancelOrder(id: number): Observable<void> {
    return new Observable<void>(observer => {
      for (let i = 0; i < this.orders.length; i++) {
        if (this.orders[i].id === id) {
          this.orders[i].status.name = 'Cancel';
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
        if (this.orders[i].id === updatedOrder.id) {
          this.orders[i] = updatedOrder;
          observer.next();
          observer.complete();
          break;
        }
      }
    });
  }
}
