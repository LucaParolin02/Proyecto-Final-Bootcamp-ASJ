import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../../../services/product-service.service';
import { imagesInterface } from '../../../../interfaces/Products/dataImages';
import { ActivatedRoute, Router } from '@angular/router';
import { productsInterface } from '../../../../interfaces/Products/dataProducts';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {

  currentProduct: productsInterface = {
    name: '',
    sku: '',
    supplier: {
    name: '',
    code: '',
    logo: undefined,
    cuit: '',
    web: undefined,
    email: '',
    phone: '',
    street: undefined,
    zip: '',
    city: '',
    contact:{
      name: '',
      lastName: '',
      phone: '',
      email: '',
      role: '',
    },
    vatCondition:{
        name: '',
    },
    sector:{
      name: '',
    },
    province:{
        name: '',
        country: {
          name: ''
        }
    }},
    desc: '',
    price: 0,
    category: {
      name: ''
    }
  };

  principalImg!: string;
  images: imagesInterface[] = [];
  defaultImage = 'https://cdn-icons-png.flaticon.com/512/2748/2748558.png';

  constructor(private productService: ProductServiceService,private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.productService.getProduct(this.activatedRoute.snapshot.params['id']).subscribe((res) => {
      this.currentProduct = res;
    });
  
    this.productService.getImagesByProd(this.activatedRoute.snapshot.params['id']).subscribe((res) => {
      this.images = res;
      if (this.images.length > 0) {
        this.principalImg = this.images[0].url;
      }else {
        this.principalImg = this.defaultImage; 
      }
    }, (error) => {
      this.principalImg = this.defaultImage; 
    });
  }

  public changeImage(url: string): void {
    this.principalImg = url;
  }

}
