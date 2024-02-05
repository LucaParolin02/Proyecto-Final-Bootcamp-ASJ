import { Component, OnInit, OnDestroy } from '@angular/core';
import { PurchaseOrderServiceService } from '../../services/purchase-order-service.service';
import { orderInterface } from '../../interfaces/Orders/dataPurchase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-orders',
  templateUrl: './purchase-orders.component.html',
  styleUrls: ['./purchase-orders.component.css']
})
export class PurchaseOrdersComponent implements OnInit {

  ordersList: orderInterface[] = [];

  constructor(private service: PurchaseOrderServiceService, private router: Router) {}

  ngOnInit(): void {
    this.getOrders();
  }

  public getOrders(){
    this.service.getOrders().subscribe(
      (orders: orderInterface[]) => {
        this.ordersList = orders;
        console.log(this.ordersList);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public cancelOrder(order: orderInterface): void {
    const isConfirmed = window.confirm('Are you sure you want to cancel this order?');
    if (isConfirmed) {
      order.status = {id:1}
      this.service.cancelOrder(order.id!, order).subscribe((res)=>{
        this.getOrders();
      });
    }
  }

  public editOrder(id: number): void {
    const isConfirmed = window.confirm('Are you sure you want to edit this order?');
    if (isConfirmed) {
      this.router.navigate(['/orders' + '/' + id]);
    }
  }

  public detailsOrder(id: number): void {
    this.router.navigate(['/orders/details' + '/' + id]);
  }
}
