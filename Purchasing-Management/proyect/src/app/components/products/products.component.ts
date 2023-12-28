import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service';
import { productsInterface } from '../../interfaces/dataProducts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  productsList: productsInterface[] = [];
  
  constructor(private service: ProductServiceService, private router: Router) {}

  ngOnInit(): void {
    this.loadlist();
    this.sortProducts();
  }

  private loadlist() {
    this.productsList = this.service.getProducts();
  }

  public deleteProduct(code:number){
    const isConfirmed = window.confirm('Are you sure you want to delete this product?');
    if (isConfirmed) {
      this.service.deleteProduct(code);
      this.loadlist();
    }
  }

  public editProduct(code:number){
    const isConfirmed = window.confirm('Are you sure you want edit this product?');
    if (isConfirmed){
      this.router.navigate(['/products' + '/' + code]);
    }
  }

  public sortProducts() {
    this.productsList.sort((a, b) => a.nameProduct.localeCompare(b.nameProduct));
  }

}
