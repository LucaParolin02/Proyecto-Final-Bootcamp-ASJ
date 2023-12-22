import { Injectable } from '@angular/core';
import { ordenes } from '../interfaces/dataPurchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderServiceService {

  constructor() { }

  getOrders(): any[] {
    return  ordenes;
  }
}