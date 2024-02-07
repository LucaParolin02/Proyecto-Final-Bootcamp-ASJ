import { Component, OnInit } from '@angular/core';
import { PurchaseOrderServiceService } from '../../services/purchase-order-service.service';
import { orderInterface } from '../../interfaces/Orders/dataPurchase';
import { ActivatedRoute } from '@angular/router';
import { detailInterface } from '../../interfaces/Orders/dataDetail';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  currentOrder: orderInterface | undefined = {
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

  arrayDetails: detailInterface[] = [];

  constructor(private service: PurchaseOrderServiceService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadOrderInfo();
  }

  private loadOrderInfo(){
    this.service.getOrder(this.activatedRoute.snapshot.params['id']).subscribe((res) => {
      this.currentOrder = res;
    })

    this.service.getDetailsByOrder(this.activatedRoute.snapshot.params['id']).subscribe((res)=> {
      this.arrayDetails = res;
    })
  }
}
