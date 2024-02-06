import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service';
import { productsInterface } from '../../interfaces/Products/dataProducts';
import { Router } from '@angular/router';
import { imagesInterface } from '../../interfaces/Products/dataImages';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productsList: productsInterface[] = [];
  arrayImages: imagesInterface[] = [];

  constructor(private productService: ProductServiceService, private router: Router) {}

  ngOnInit(): void {
    this.loadList();
    this.sortProducts();
    this.loadImages();
  }

  private loadList() {
    this.productService.getProducts().subscribe((products) => {
      this.productsList = products;
    });
  }

  private loadImages(){
    this.productService.getAllImages().subscribe((image) => {
      this.arrayImages = image;
    })
  }

  public deleteProduct(id: number) {
    const isConfirmed = window.confirm('Are you sure you want to delete this product?');
    if (isConfirmed) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadList();
      });
    }
  }

  public editProduct(id: number) {
    const isConfirmed = window.confirm('Are you sure you want to edit this product?');
    if (isConfirmed) {
      this.router.navigate(['/products', id]);
    }
  }

  public getImage(id:number): string{
  const productImage = this.arrayImages.find(image => image.product.id === id);
  return productImage ? productImage.url : 'https://cdn-icons-png.flaticon.com/512/2748/2748558.png';
  }

  public sortProducts() {
    this.productsList.sort((a, b) => a.name.localeCompare(b.name));
  }
}
