import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductServiceService } from '../../services/product-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { supplierInterface } from '../../interfaces/Suppliers/dataSuppliers';
import { productsInterface } from '../../interfaces/Products/dataProducts';
import { SupplierServiceService } from '../../services/supplier-service.service';
import { categoryInterface } from '../../interfaces/Products/dataCategories';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})

export class CreateProductComponent implements OnInit {

  product: productsInterface = {
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

  suppliersList: supplierInterface[] = [];
  categoryList: categoryInterface[] = [];
  editMode: boolean = false;
  private editProductCode: number | null = null;

  constructor(
    private productService: ProductServiceService,
    private supplierService: SupplierServiceService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.supplierService.getSuppliers().subscribe((resp) => {
      this.suppliersList = resp;
    });

    this.productService.getCategories().subscribe((res) => {
      console.log(res);
      this.categoryList = res;
    });

    this.route.params.subscribe((params) => {
      const codeParam = params['id'];
      if (codeParam) {
        this.editMode = true;
        this.editProductCode = +codeParam;
        this.loadProductData();
      }
    });
  }

  submitForm(form: NgForm): void {
    const product: productsInterface = this.buildProduct(form);
    if (this.editMode) {
      product.id = this.editProductCode || 0;
      this.productService.updateProduct(product.id, product).subscribe(() => {
        this.router.navigate(['/products']);
      });
    } else {
      this.productService.addProduct(product).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }

  private loadProductData(): void {
    if (this.editProductCode !== null) {
      this.productService.getProduct(this.editProductCode).subscribe((currentProduct) => {
        if (currentProduct) {
          this.product = { ...currentProduct };
        }
      });
    }
  }

  private buildProduct(form: NgForm): productsInterface {
    return {
      sku: form.value.sku,
      name: form.value.name,
      supplier: {id: parseInt(form.value.supplier)},
      category: {id: parseInt(form.value.category)},
      desc: form.value.desc,
      price: form.value.price,
    };
  }
}
