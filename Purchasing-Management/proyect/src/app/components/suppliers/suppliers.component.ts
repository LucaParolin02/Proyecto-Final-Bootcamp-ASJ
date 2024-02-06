import { Component, OnInit } from '@angular/core';
import { SupplierServiceService } from '../../services/supplier-service.service';
import { supplierInterface } from '../../interfaces/Suppliers/dataSuppliers';
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
  defaultImageURL: string = 'https://cdn-icons-png.flaticon.com/512/2748/2748558.png';

  constructor(private service: SupplierServiceService, private router: Router) { }

  ngOnInit(): void {
    this.loadlist();
  }

  private loadlist() {
    this.service.getSuppliers().subscribe((res)=>{
      console.log(res);
      this.supplierList = res;
    })
  }

  public delete(id: number) {
    const isConfirmed = window.confirm('Are you sure you want to delete this supplier?');
    if (isConfirmed) {
      this.service.deleteSupplier(id).subscribe(() => {
        this.loadlist();
      })
    }
  }

  public edit(code: number) {
    const isConfirmed = window.confirm('Are you sure you want edit this supplier?');
    if (isConfirmed) {
      this.router.navigate(['/suppliers' + '/' + code]);
    }
  }

  public handleImageError(event: any) {
    event.target.src = this.defaultImageURL;
  }

  public detailsSupp(id: number): void {
    this.router.navigate(['/suppliers/details' + '/' + id]);
  }
}
