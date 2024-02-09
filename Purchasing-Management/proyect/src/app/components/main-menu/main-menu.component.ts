import { Component, OnInit } from '@angular/core';
import { SupplierServiceService } from '../../services/supplier-service.service';
import { ProductServiceService } from '../../services/product-service.service';
import { PurchaseOrderServiceService } from '../../services/purchase-order-service.service';
import { supplierInterface } from '../../interfaces/Suppliers/dataSuppliers';
import { productsInterface } from '../../interfaces/Products/dataProducts';
import { orderInterface } from '../../interfaces/Orders/dataPurchase';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css'
})
export class MainMenuComponent implements OnInit{

  suppliersList: supplierInterface[] = [];
  productsList: productsInterface[] = [];
  ordersList: orderInterface[] = [];

  constructor(private suppService: SupplierServiceService, private prodService: ProductServiceService, private orderService: PurchaseOrderServiceService){}

  ngOnInit(): void {
    this.loadLists();
  }

  private loadLists(){
    this.loadSuppList();
    this.loadProdList();
    this.loadOrderList();
  }

  private loadSuppList(): void{
    this.suppService.getSuppliers().subscribe((res) => {
      this.suppliersList = res;
    })
  }

  private loadProdList(): void{
    this.prodService.getProducts().subscribe((res) => {
      this.productsList = res;
    })
  }

  private loadOrderList(): void{
    this.orderService.getOrders().subscribe((res) => {
      this.ordersList = res;
    })
  }

}
