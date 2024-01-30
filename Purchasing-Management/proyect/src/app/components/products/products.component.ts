import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service';
import { productsInterface } from '../../interfaces/dataProducts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productsList: productsInterface[] = [];

  constructor(private productService: ProductServiceService, private router: Router) {}

  ngOnInit(): void {
    this.loadList();
    this.sortProducts();
  }

  private loadList() {
    this.productService.getProducts().subscribe((products) => {
      this.productsList = products;
    });
  }

  public deleteProduct(code: number) {
    const isConfirmed = window.confirm('Are you sure you want to delete this product?');
    if (isConfirmed) {
      this.productService.deleteProduct(code).subscribe(() => {
        this.loadList();
      });
    }
  }

  public editProduct(code: number) {
    const isConfirmed = window.confirm('Are you sure you want to edit this product?');
    if (isConfirmed) {
      this.router.navigate(['/products', code]);
    }
  }

  public sortProducts() {
    this.productsList.sort((a, b) => a.nameProduct.localeCompare(b.nameProduct));
  }
}
