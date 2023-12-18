import { Injectable } from '@angular/core';
import { ordenes } from '../data/dataPurchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderServiceService {

  constructor() { }

  getOrders(): any[] {
    return  ordenes;
  }
}