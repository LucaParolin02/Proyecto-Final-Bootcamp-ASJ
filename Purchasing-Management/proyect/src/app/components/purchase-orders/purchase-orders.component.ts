import { Component } from '@angular/core';
import { PurchaseOrderServiceService } from '../../services/purchase-order-service.service';

@Component({
  selector: 'app-purchase-orders',
  templateUrl: './purchase-orders.component.html',
  styleUrl: './purchase-orders.component.css'
})
export class PurchaseOrdersComponent {
  
  ordersList: any = [];

  constructor(private service: PurchaseOrderServiceService) {}

  ngOnInit(): void {
    this.ordersList = this.service.getOrders();
  }
}
