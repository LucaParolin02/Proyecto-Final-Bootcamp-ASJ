import { Component, OnInit } from '@angular/core';
import { SupplierServiceService } from '../../services/supplier-service.service';
import { supplierInterface } from '../../interfaces/dataSuppliers';
import { Router } from '@angular/router';


@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

  supplierList: supplierInterface[] = [];
  selectedSupplier: supplierInterface | null = null;
  countriesList: any = [];

  constructor(private service: SupplierServiceService, private router: Router) { }

  ngOnInit(): void {
    this.loadlist();
  }

  private loadlist() {
    this.supplierList = this.service.getSuppliers();
  }

  public delete(code: number) {
    const isConfirmed = window.confirm('Are you sure you want to delete this supplier?');
    if (isConfirmed) {
      this.service.deleteSupplier(code);
      this.loadlist();
    }
  }

  public edit(code: number) {
    const isConfirmed = window.confirm('Are you sure you want edit this supplier?');
    if (isConfirmed) {
      this.router.navigate(['/suppliers' + '/' + code]);
    }
  }
}
