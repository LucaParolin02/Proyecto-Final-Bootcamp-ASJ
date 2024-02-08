import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service';
import { productsInterface } from '../../interfaces/Products/dataProducts';
import { Router } from '@angular/router';
import { imagesInterface } from '../../interfaces/Products/dataImages';
import { categoryInterface } from '../../interfaces/Products/dataCategories';
import { AlertsService } from '../../services/alerts.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productsList: productsInterface[] = [];
  arrayImages: imagesInterface[] = [];
  productsListDeleted: productsInterface[] = [];
  deleteMode = false;
  categoryFilter: string = 'All';
  categoryList: categoryInterface[] = [];
  searchTerm: string  = '';
  uniqueCategories: Set<string> = new Set();
  uniqueCategoriesDeleted: Set<string> = new Set();

  constructor(private productService: ProductServiceService, private router: Router, private alertsService: AlertsService) {}

  ngOnInit(): void {
    this.loadList();
    this.loadListDeleted();
    this.sortProducts();
    this.loadImages();
  }

  private loadList() {
    this.productService.getProducts().subscribe((products) => {
      console.log(products);
      this.productsList = products;
      this.filterUniqueCategory();
      this.filterUniqueCategoryDeleted();
    });
  }

  private loadListDeleted(){
    this.productService.getDeletedProducts().subscribe((productsDeleted) => {
      this.productsListDeleted = productsDeleted;
    })
  }

  private loadImages(){
    this.productService.getImages().subscribe((image) => {
      this.arrayImages = image;
    })
  }

  public deleteProduct(id: number) {
    this.alertsService.showConfirmation('Are you sure you want to delete this product?').then((isConfirmed) => {
      if (isConfirmed) {
        this.productService.deleteProduct(id).subscribe(() => {
          this.loadList();
          this.loadListDeleted();
        });
      }
    });
  }

  public editProduct(id: number) {
    this.alertsService.showConfirmation('Are you sure you want to edit this product?').then((isConfirmed) => {
      if (isConfirmed) {
        this.router.navigate(['/products', id]);
      }
    });
  }

  public getImage(id:number): string | null{
  const productImage = this.arrayImages.find(image => image.product.id === id);
  return productImage ? productImage.url : 'https://cdn-icons-png.flaticon.com/512/2748/2748558.png';
  }

  public sortProducts() {
    this.productsList.sort((a, b) => a.name.localeCompare(b.name));
  }

  public detailsProd(id: number): void {
    this.router.navigate(['/products/details' + '/' + id]);
  }

  public changeMode(){
    this.deleteMode = !this.deleteMode;
  }

  public updateCategoryFilter(category: string) {
    this.categoryFilter = category;
  }

  public filterByCategory(product: productsInterface): boolean {
    if (this.categoryFilter !== 'All') {
      return true;
    } else {
      return product.category.name === this.categoryFilter;
    }
  }

  private filterUniqueCategory(): void {
    this.uniqueCategories.clear(); 
    this.productsList.forEach(product => {
      this.uniqueCategories.add(product.category.name!);
    });
  }

  private filterUniqueCategoryDeleted(): void {
    this.uniqueCategoriesDeleted.clear();
    this.productsListDeleted.forEach(productDeleted =>{
      this.uniqueCategoriesDeleted.add(productDeleted.category.name!);
    });
  }

  public resProd(id: number){
    this.alertsService.showConfirmation('Are you sure you want to restore this product?').then((isConfirmed) => {
      if (isConfirmed) {
        this.productService.restoreProduct(id).subscribe(() => {
          this.loadList();
          this.loadListDeleted();
        });
      }
    });
  }

  public handleImageError(event: any) {
    event.target.src = 'https://cdn-icons-png.flaticon.com/512/2748/2748558.png';
}


}
