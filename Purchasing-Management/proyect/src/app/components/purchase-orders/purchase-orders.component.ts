import { Component } from '@angular/core';
import { PurchaseOrderServiceService } from '../../services/purchase-order-service.service';
import { orderInterface } from '../../interfaces/dataPurchase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-orders',
  templateUrl: './purchase-orders.component.html',
  styleUrl: './purchase-orders.component.css'
})
export class PurchaseOrdersComponent {

  ordersList: orderInterface[] = [];

  constructor(private service: PurchaseOrderServiceService, private router: Router) {}

  ngOnInit(): void {
    this.loadlist();
  }
  
  private loadlist() {
    this.ordersList = this.service.getOrders();
    console.log(this.ordersList);
  }

  public cancelOrder(code:number){
    const isConfirmed = window.confirm('Are you sure you want to cancel this order?');
    if (isConfirmed) {
      this.service.cancelOrder(code);
      this.loadlist();
    }
  }

  public editOrder(code:number){
    const isConfirmed = window.confirm('Are you sure you want edit this order?');
    if (isConfirmed){
      this.router.navigate(['/orders' + '/' + code]);
    }
  }

  public detailsOrder(code:number){
    this.router.navigate(['/orders/details' + '/' + code]);
  }



}
