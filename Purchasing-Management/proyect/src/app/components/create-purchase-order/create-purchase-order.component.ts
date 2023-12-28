import { Component, OnInit } from '@angular/core';
import { PurchaseOrderServiceService } from '../../services/purchase-order-service.service';
import { SupplierServiceService } from '../../services/supplier-service.service';
import { ProductServiceService } from '../../services/product-service.service';
import { supplierInterface } from '../../interfaces/dataSuppliers';
import { productsInterface } from '../../interfaces/dataProducts';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { orderInterface, productsList } from '../../interfaces/dataPurchase';

@Component({
  selector: 'app-create-purchase-order',
  templateUrl: './create-purchase-order.component.html',
  styleUrl: './create-purchase-order.component.css'
})
export class CreatePurchaseOrderComponent implements OnInit{

  Order: orderInterface = {
    date: new Date(),
    expectedDate: new Date(),
    status: false,
    info: '',
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
    products: [],
    totalPrice: 0
};

  supplierList: supplierInterface[] = [];
  productsList: productsInterface[] = [];
  selectedProductPrice = 0;
  selectedProductsList: productsInterface[] = [];

  product: productsList ={
    id: 0,
    name: '',
    price: 0,
    quantity: 1
  }

  editMode: boolean = false;
  private editOrderCode: number | null = null;

  constructor(private service: PurchaseOrderServiceService, private serviceSupplier: SupplierServiceService,
     private serviceProducts: ProductServiceService,private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    
    this.supplierList = this.serviceSupplier.getSuppliers();

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
      const currentOrder = this.service.getOrder(this.editOrderCode);
      if (currentOrder) {
        this.Order = { ...currentOrder };
      }
    }
  }

  submitForm(form: NgForm): void {
    if (this.editMode) {
      const editOrder: orderInterface = this.editingOrder(form);
      this.service.updateOrder(editOrder);
    }else {
      this.service.addOrder(form.value);
    }
    this.router.navigate(['/orders']);
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
    console.log('Selected Supplier:', selectedSupplier);

    if (selectedSupplier) {
        this.productsList = this.serviceProducts.getProducts().filter(product =>
            product.supplier.name === name
        );
        this.product.id = this.productsList[0].sku!;
        this.product.name = this.productsList[0].nameProduct;
        this.product.price = this.productsList[0].price;
      
        console.log('Filtered Products:', this.productsList);
    }
}

public addProductToOrder(): void {
  const productToAdd: productsList = { ...this.product };
  productToAdd.price = this.product.price * this.product.quantity; 
  this.Order.totalPrice += productToAdd.price; 
  this.Order.products.push(productToAdd); 
  this.product.quantity = 1; 
}

public loadProduct(selectedProduct: string): void {
  const productSelected = this.productsList.find((obj) => { obj.sku == parseInt(selectedProduct)});
  this.product.price = productSelected?.price!;
  this.product.name = productSelected?.nameProduct!;
}

}
