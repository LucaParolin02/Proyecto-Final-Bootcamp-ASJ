import { Component, OnInit } from '@angular/core';
import { PurchaseOrderServiceService } from '../../services/purchase-order-service.service';
import { SupplierServiceService } from '../../services/supplier-service.service';
import { ProductServiceService } from '../../services/product-service.service';
import { orderInterface } from '../../interfaces/dataPurchase';
import { supplierInterface } from '../../interfaces/dataSuppliers';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { productsInterface } from '../../interfaces/dataProducts';

@Component({
  selector: 'app-create-purchase-order',
  templateUrl: './create-purchase-order.component.html',
  styleUrls: ['./create-purchase-order.component.css']
})
export class CreatePurchaseOrderComponent implements OnInit {

  Order: orderInterface = {
    date: new Date(),
    expectedDate: new Date(),
    status: false,
    info: '',
    supplier: {
      id: 0,
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
    products: [],
    totalPrice: 0
  };

  supplierList: supplierInterface[] = [];
  selectedProductsList: productsInterface[] = [];

  product: productsInterface = {
    id: 0,
    sku: 0,
    nameProduct: '',
    supplier: {
      id: 0,
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
      code: 0,
      catName: '',
      created: new Date(),
      updated: new Date()
    },
    description: ' ',
    price: 0,
    quantity: 0
  };

  editMode: boolean = false;
  private editOrderCode: number | null = null;

  constructor(
    private orderService: PurchaseOrderServiceService,
    private supplierService: SupplierServiceService,
    private productService: ProductServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.supplierService.getSuppliers().subscribe((resp) => {
      this.supplierList = resp;
    });

    this.route.params.subscribe(params => {
      const codeParam = params['id'];
      if (codeParam) {
        this.editMode = true;
        this.editOrderCode = +codeParam;
        this.loadOrderData();
      }
    });
  }

  private loadOrderData(): void {
    if (this.editOrderCode !== null) {
      this.orderService.getOrder(this.editOrderCode).subscribe((currentOrder) => {
        if (currentOrder) {
          this.Order = { ...currentOrder };
        }
      });
    }
  }

  submitForm(form: NgForm): void {
    if (this.editMode) {
      const editOrder: orderInterface = this.editingOrder(form);
      this.orderService.updateOrder(editOrder).subscribe(() => {
        this.router.navigate(['/orders']);
      });
    } else {
      this.orderService.addOrder(form.value).subscribe(() => {
        this.router.navigate(['/orders']);
      });
    }
  }

  private editingOrder(form: NgForm): orderInterface {
    return {
      code: this.editOrderCode || 0,
      date: form.value.date,
      expectedDate: form.value.expectedDate,
      status: form.value.status,
      info: form.value.info,
      supplier: form.value.supplier,
      products: form.value.product,
      totalPrice: form.value.totalPrice
    };
  }

  public selectSupplier(name: string): void {
    const selectedSupplier = this.Order.supplier;
  
    if (selectedSupplier) {
      this.productService.getProductsBySupplier(name).subscribe(products => {
        this.selectedProductsList = products;
        this.product.id = this.selectedProductsList[0]?.id || 0;  
        this.product.nameProduct = this.selectedProductsList[0]?.nameProduct || '';
        this.product.price = this.selectedProductsList[0]?.price || 0;
      });
    }
  }

  public addProductToOrder(): void {
    const productToAdd: productsInterface = { 
        id: this.product.id,
        nameProduct: this.product.nameProduct,
        supplier: this.product.supplier,
        category: this.product.category,
        description: this.product.description,
        price: this.product.price,
        quantity: this.product.quantity
    };

    productToAdd.price = this.product.price * this.product.quantity;
    this.Order.totalPrice += productToAdd.price;
    this.Order.products.push(productToAdd);
    this.product.quantity = 1;
}

  public loadProduct(selectedProduct: string): void {
    const productSelected = this.selectedProductsList.find((obj) => obj.id === parseInt(selectedProduct));
    this.product.price = productSelected?.price!;
    this.product.nameProduct = productSelected?.nameProduct!;
  }
}
