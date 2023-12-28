import { Injectable } from '@angular/core';
import { orderInterface } from '../interfaces/dataPurchase';


@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderServiceService {

  private orders: orderInterface[] = [];

  constructor() { }

  public getOrders(): orderInterface[] {
    return this.orders;
  }

  public getOrder(code: number): orderInterface | undefined {
    return this.orders.find(orders => orders.code === code);
  }

  public addOrder(order: orderInterface) {
    if (this.orders.length > 0) {
      const lastorder = this.orders[this.orders.length - 1];
      if (lastorder.code !== undefined) {
        order.code = lastorder.code + 1;
      }
    } else {
      order.code = 0;
    }
    order.status = true;
    this.orders.push(order);
  }

  public cancelOrder(code: number): void {
    for (let i = 0; i < this.orders.length; i++) {
      if (this.orders[i].code === code) {
        this.orders[i].status = false;
        break;
      }
    }
  }

  public updateOrder(updatedOrder: orderInterface): void {
    for (let i = 0; i < this.orders.length; i++) {
      if (this.orders[i].code === updatedOrder.code) {
        this.orders[i] = updatedOrder;
        break;
      }
    }
  }

}