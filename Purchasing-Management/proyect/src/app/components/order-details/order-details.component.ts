import { Component, OnInit } from '@angular/core';
import { PurchaseOrderServiceService } from '../../services/purchase-order-service.service';
import { orderInterface } from '../../interfaces/dataPurchase';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  order: orderInterface | undefined;

  constructor(private service: PurchaseOrderServiceService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const codeParam = params['id'];
      if (codeParam) {
        const orderCode = +codeParam;
        this.loadOrderDetails(orderCode);
      }
    });
  }

  private loadOrderDetails(code: number): void {
    this.service.getOrder(code).subscribe(
      (order: orderInterface | undefined) => {
        this.order = order;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
