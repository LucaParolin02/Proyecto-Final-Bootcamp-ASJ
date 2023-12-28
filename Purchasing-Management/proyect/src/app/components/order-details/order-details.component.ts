import { Component, OnInit } from '@angular/core';
import { PurchaseOrderServiceService } from '../../services/purchase-order-service.service';
import { orderInterface } from '../../interfaces/dataPurchase';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit{

  order: orderInterface[] = []

  constructor(private service: PurchaseOrderServiceService,private route: ActivatedRoute){}


  ngOnInit(): void {
    this.loadlist();

    this.route.params.subscribe(params => {
      const codeParam = params['id'];
      if (codeParam) {
        
      }
    });
  }

  public loadlist(){
    this.order = this.service.getOrders();
  }
}
