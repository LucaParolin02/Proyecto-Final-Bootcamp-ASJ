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
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-create-purchase-order',
  templateUrl: './create-purchase-order.component.html',
  styleUrls: ['./create-purchase-order.component.css']
})
export class CreatePurchaseOrderComponent implements OnInit {

  Order: orderInterface = {
    created: '',
    expected: new Date() ,
    status: {
    },
    info: '',
    supplier: {
    contact:{
    },
    vatCondition:{
    },
    sector:{
    },
    province:{
        country: {
        }
    }
    },
    total: 0
  };

  orderDetail: detailInterface = {
    quantity: 0,
    price: 0,
    product: {
      supplier: {
      contact:{
      },
      vatCondition:{
      },
      sector:{
      },
      province:{
          country: {
          }
      }},
      category: {
      }
    },
    order: {
      status: {
      },
      supplier: {
      contact:{
      },
      vatCondition:{
      },
      sector:{
      },
      province:{
          country: {
          }
      }
      },
      total: 0
    }
  };

  product: productsInterface = {
    name: '',
    sku: '',
    supplier: {
    contact:{
    },
    vatCondition:{
    },
    sector:{
    },
    province:{
        country: {
        }
    }},
    desc: '',
    price: 0,
    category: {
    }
  };

  editMode: boolean = false;
  private editOrderCode: number | null = null;
  supplierList: supplierInterface[] = [];
  detailList: any[] = [];
  selectedProductsList: productsInterface[] = [];
  statusList: any = [];
  isSupplierSelectDisabled = false;
  selectedSupplierId:string = "-1";
  supplierImageUrl: string = '';
  defaultImageURL: string = 'https://cdn-icons-png.flaticon.com/512/2748/2748558.png';

  constructor(
    private orderService: PurchaseOrderServiceService,
    private supplierService: SupplierServiceService,
    private productService: ProductServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private alertsService: AlertsService
  ) {this.setTodayDate();}

  ngOnInit(): void {
    this.supplierService.getSuppliers().subscribe((resp) => {
      this.supplierList = resp;
    });

    this.orderService.getStatus().subscribe((status) => {
      this.statusList = status;
    });

    this.route.params.subscribe(params => {
      const codeParam = params['id'];
      if (codeParam) {
        this.editMode = true;
        this.editOrderCode = +codeParam;
        this.isSupplierSelectDisabled = true;
        this.loadOrderData();
        
      }
    });
  }

  private loadOrderData(): void {
    if (this.editOrderCode !== null) {
      this.orderService.getOrder(this.editOrderCode).subscribe((currentOrder) => {
        if (currentOrder) {
          this.Order = { ...currentOrder };
          if (currentOrder.supplier?.id !== undefined) {
            this.selectedSupplierId = currentOrder.supplier.id.toString();
          }
        }
      });
    }
  }

  submitForm(form: NgForm): void {
    if (this.editMode) {
      const editOrder: orderInterface = this.editingOrder(form);
      editOrder.id = this.editOrderCode || 0;
      console.log(editOrder);
      if (editOrder.id){
        this.orderService.updateOrder(editOrder.id , editOrder).subscribe(() => {
          this.alertsService.shoewEditedSucces('Order updated successfully!');
          this.router.navigate(['/orders']);
        });
      }
    } else {    
      const newOrder = {created: this.convertDate(form.value.created) , expected: form.value.expected ,total: this.calculateTotal(), info: form.value.info, supplier: {id: parseInt(this.selectedSupplierId)}, status: {id: 3 } };
      console.log(newOrder);
      this.orderService.addOrder(newOrder).subscribe((res) => {
        for(let detail of this.detailList){
          detail.order = {id: res.id}
        }
        this.orderService.addDetails(this.detailList).subscribe(() => {
          this.alertsService.showSuccess('Order created successfully!');
          this.router.navigate(['/orders']);
        })
      });
    }
  }

  private editingOrder(form: NgForm): orderInterface {
    return {
      created: this.Order.created,
      expected: form.value.expected,
      status: {id: parseInt(form.value.status)},
      info: form.value.info,
      supplier: this.Order.supplier,
      total: this.Order.total
    };
  }

  public selectSupplier(id: number): void {  
    if (id) {
        this.productService.getProductsBySupplier(id).subscribe(products => {
            this.selectedProductsList = products;
        });

        const selectedSupp = this.supplierList.find(
            (supplier) => supplier.id === Number(id)
        );

        this.supplierImageUrl = selectedSupp ? selectedSupp.logo || this.defaultImageURL : this.defaultImageURL;
    } else {
        this.selectedProductsList = [];
        this.supplierImageUrl = this.defaultImageURL;
    }
}

  setTodayDate(): void {
    const today = new Date(); 
    const year = today.getFullYear(); 
    const month = ('0' + (today.getMonth() + 1)).slice(-2); 
    const day = ('0' + today.getDate()).slice(-2); 
    this.Order.created = `${day}/${month}/${year}`;
  }

    private convertDate(fecha: string) {
    const partes = fecha.split('/');
    const day = partes[0];
    const month = partes[1];
    const year = partes[2];
    const nuevaFecha = `${year}-${month}-${day}`;
    return nuevaFecha;
  }
  

  public addProductToOrder(id: number): void {
    this.isSupplierSelectDisabled = true;
    const selectedProduct = this.selectedProductsList.find(product => product.id === id);
    
    if (selectedProduct) {
      const existingDetailIndex = this.detailList.findIndex((detail: detailInterface) => {
        return Number(detail.product.id) === Number(id);
      }); 
      
      if (existingDetailIndex !== -1) {
        this.detailList[existingDetailIndex].quantity += this.orderDetail.quantity; 
      } else {
        const newDetail = {
          product: selectedProduct,
          price: selectedProduct.price, 
          quantity: this.orderDetail.quantity
        };
        this.detailList.push(newDetail);
      }
    } else {
      console.log('Product not found');
    }
}

public calculateTotal(): number{
  let total = 0;
  for(let detail of this.detailList){
    total += detail.product.price * detail.quantity;
  }
  return total;
}

  public loadProduct(id: number): void {
    this.productService.getProduct(id).subscribe((res:productsInterface) => {
      this.product = res;
    })
  }

  public getMinDate(): string {
    const minDays = 2;
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + minDays);

    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }

  public getMaxDate(): string {
    const maxDays = 365;
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + maxDays);

    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }

  public isDeliveryDateValid() {
    const deliveryDate = new Date(this.Order.expected!);
    const minDate = new Date(this.getMinDate());
    const maxDate = new Date(this.getMaxDate());

    return deliveryDate >= minDate && deliveryDate <= maxDate;
  }

  public handleImageError(event: any) {
    console.log(event);
    event.target.src = this.defaultImageURL;
  }

}
