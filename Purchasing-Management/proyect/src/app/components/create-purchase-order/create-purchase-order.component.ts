import { Component, OnInit } from '@angular/core';
import { PurchaseOrderServiceService } from '../../services/purchase-order-service.service';
import { SupplierServiceService } from '../../services/supplier-service.service';
import { ProductServiceService } from '../../services/product-service.service';
import { orderInterface } from '../../interfaces/Orders/dataPurchase';
import { supplierInterface } from '../../interfaces/Suppliers/dataSuppliers';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { productsInterface } from '../../interfaces/Products/dataProducts';
import { detailInterface } from '../../interfaces/Orders/dataDetail';

@Component({
  selector: 'app-create-purchase-order',
  templateUrl: './create-purchase-order.component.html',
  styleUrls: ['./create-purchase-order.component.css']
})
export class CreatePurchaseOrderComponent implements OnInit {

  Order: orderInterface = {
    created: new Date(),
    expected: new Date(),
    status: {
      name: ''
    },
    info: '',
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
    }
    },
    total: 0
  };

  orderDetail: detailInterface = {
    quantity: 0,
    price: 0,
    product: {
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
    },
    order: {
      created: new Date(),
      expected: new Date(),
      status: {
        name: ''
      },
      info: '',
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
      }
      },
      total: 0
    }
  };

  supplierList: supplierInterface[] = [];
  selectedProductsList: productsInterface[] = [];

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
      created: form.value.date,
      expected: form.value.expected,
      status: form.value.status,
      info: form.value.info,
      supplier: form.value.supplier,
      total: form.value.totalPrice
    };
  }

  public selectSupplier(name: string): void {
    const selectedSupplier = this.Order.supplier;
  
    if (selectedSupplier) {
      this.productService.getProductsBySupplier(name).subscribe(products => {
        this.selectedProductsList = products;
        this.product.id = this.selectedProductsList[0]?.id || 0;  
        this.product.name = this.selectedProductsList[0]?.name || '';
        this.product.price = this.selectedProductsList[0]?.price || 0;
      });
    }
  }

  public addProductToOrder(): void {
    const productToAdd: productsInterface = { 
        name: this.product.name,
        sku: this.product.sku,
        supplier: this.product.supplier,
        category: this.product.category,
        desc: this.product.desc,
        price: this.product.price,
    };
    this.Order.total += productToAdd.price;
    //HACER LA CANTIDAD * PRECI ODEPSUES VEO
}

  public loadProduct(selectedProduct: string): void {
    const productSelected = this.selectedProductsList.find((obj) => obj.id === parseInt(selectedProduct));
    this.product.price = productSelected?.price!;
    this.product.name = productSelected?.name!;
  }
}
