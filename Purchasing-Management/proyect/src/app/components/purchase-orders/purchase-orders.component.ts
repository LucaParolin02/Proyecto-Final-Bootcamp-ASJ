import { Component, OnInit, OnDestroy } from '@angular/core';
import { PurchaseOrderServiceService } from '../../services/purchase-order-service.service';
import { orderInterface } from '../../interfaces/Orders/dataPurchase';
import { Router } from '@angular/router';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-purchase-orders',
  templateUrl: './purchase-orders.component.html',
  styleUrls: ['./purchase-orders.component.css']
})
export class PurchaseOrdersComponent implements OnInit {

  ordersList: orderInterface[] = [];
  statusFilter: string = 'All';
  uniqueStatuses: Set<string> = new Set();

  constructor(private service: PurchaseOrderServiceService, private router: Router,private alertsService: AlertsService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  public getOrders(){
    this.service.getOrders().subscribe(
      (orders: orderInterface[]) => {
        this.ordersList = orders;
        this.filterUniqueStatuses();
        console.log(this.ordersList);
      },
      (error) => {
        console.error(error);
        this.alertsService.showError('Failed to fetch orders. Please try again later.');
      }
    );
  }

  public cancelOrder(order: orderInterface): void {
    this.alertsService.showConfirmation('Are you sure you want to cancel this order?').then((isConfirmed) => {
      if (isConfirmed) {
        order.status = {id: 1};
        this.service.cancelOrder(order.id!, order).subscribe((res)=>{
          this.getOrders();
        });
      }
    });
  }

  public editOrder(id: number): void {
    this.alertsService.showConfirmation('Are you sure you want to edit this order?').then((isConfirmed) => {
      if (isConfirmed) {
        this.router.navigate(['/orders' + '/' + id]);
      }
    });
  }

  public detailsOrder(id: number): void {
    this.router.navigate(['/orders/details' + '/' + id]);
  }

  public updateStatusFilter(status: string) {
    this.statusFilter = status;
  }

  public filterByStatus(order: orderInterface): boolean {
    if (this.statusFilter !== 'All') {
      return true;
    } else {
      return order.status.name === this.statusFilter;
    }
  }

  filterUniqueStatuses(): void {
    this.uniqueStatuses.clear(); 
    this.ordersList.forEach(order => {
      this.uniqueStatuses.add(order.status.name!);
    });
  }
}
