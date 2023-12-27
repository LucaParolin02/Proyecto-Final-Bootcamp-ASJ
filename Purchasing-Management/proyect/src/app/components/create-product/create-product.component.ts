import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductServiceService } from '../../services/product-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { supplierInterface } from '../../interfaces/dataSuppliers';
import { productsInterface } from '../../interfaces/dataProducts';
import { SupplierServiceService } from '../../services/supplier-service.service';


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
      field: 'Other',
      cuit: '',
      email: '',
      web: '',
      phone: 0,
      street: '',
      number: '',
      postalCode: '',
      city: '',
      province: '',
      country: '',
      iva: 'Other'
    },
    category: 'Other',
    description: '',
    price: 0,
  };

  suppliersList: supplierInterface[] = [];
  editMode: boolean = false;
  private editProductCode: number | null = null;

  constructor(private service: ProductServiceService,private serviceSuppliers: SupplierServiceService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.suppliersList = this.serviceSuppliers.getSuppliers();

    this.route.params.subscribe(params => {
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
      this.service.updateProduct(editProduct);
    }else {
      this.service.addProduct(form.value);
    }
    this.router.navigate(['/products']);
  }

  private loadProductData(): void {
    if (this.editProductCode !== null) {
      const currentProduct = this.service.getProduct(this.editProductCode);
      if (currentProduct) {
        this.product = { ...currentProduct };
      }
    }
  }

  private editingProduct(form: NgForm): productsInterface {
    return {
      sku: this.product.sku,
      nameProduct: form.value.nameProduct,
      supplier: form.value.supplier,
      category: form.value.category,
      description: form.value.description,
      price: form.value.price,
    };
  }
  
}