import { Component } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  productsList: any = [];

  constructor(private service: ProductServiceService) {}

  ngOnInit(): void {
    this.productsList = this.service.getProducts();
  }
}
