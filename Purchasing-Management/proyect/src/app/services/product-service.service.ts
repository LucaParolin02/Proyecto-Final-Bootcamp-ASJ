import { Injectable } from '@angular/core';
import { productos } from '../interfaces/dataProducts';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor() { }

  getProducts(): any[] {
    return  productos;
  }
}
