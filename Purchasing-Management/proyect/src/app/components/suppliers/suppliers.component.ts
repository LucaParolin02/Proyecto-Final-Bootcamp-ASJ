import { Component, OnInit } from '@angular/core';
import { SupplierServiceService } from '../../services/supplier-service.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {
  supplierList: any = [];

  constructor(private service: SupplierServiceService) {}

  ngOnInit(): void {
    this.supplierList = this.service.getSuppliers();
  }
}