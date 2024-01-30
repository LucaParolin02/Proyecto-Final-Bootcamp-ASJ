import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductServiceService } from '../../services/product-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { supplierInterface } from '../../interfaces/dataSuppliers';
import { productsInterface } from '../../interfaces/dataProducts';
import { SupplierServiceService } from '../../services/supplier-service.service';
import { categoryInterface } from '../../interfaces/dataCategories';
import { CategoriesServiceService } from '../../services/categories-service.service';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})

export class CreateProductComponent implements OnInit {

  product: productsInterface = {
    nameProduct: '',
    supplier: {
      code: 0,
      name: '',
      sectors: {
        sectorName: '',
        created: new Date()
      },
      cuit: '',
      email: '',
      web: '',
      phone: 0,
      street: '',
      number: 0,
      postalCode: '',
      city: '',
      province: '',
      country: '',
      iva: 'Other'
    },
    category: {
      catName: '',
      created: new Date()
    },
    description: '',
    price: 0,
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
    private categoryService: CategoriesServiceService
  ) {}

  ngOnInit(): void {
    this.supplierService.getSuppliers().subscribe((resp) => {
      this.suppliersList = resp;
    });

    this.categoryService.getCategories().subscribe((res) => {
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
    if (this.editMode) {
      const editProduct: productsInterface = this.editingProduct(form);
      this.productService.updateProduct(editProduct).subscribe(() => {
        this.router.navigate(['/products']);
      });
    } else {
      this.productService.addProduct(form.value).subscribe(() => {
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

  private editingProduct(form: NgForm): productsInterface {
    return {
      sku: this.product.sku,
      nameProduct: form.value.nameProduct,
      supplier: form.value.supplier,
      category: form.value.cat,
      description: form.value.description,
      price: form.value.price,
    };
  }
}
