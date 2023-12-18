import { Injectable } from '@angular/core';
import { productos } from '../data/dataProducts';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor() { }

  getProducts(): any[] {
    return  productos;
  }
}
