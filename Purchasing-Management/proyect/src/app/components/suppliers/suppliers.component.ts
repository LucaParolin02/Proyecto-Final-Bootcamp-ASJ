import { Component, OnInit } from '@angular/core';
import { SupplierServiceService } from '../../services/supplier-service.service';
import { supplierInterface } from '../../interfaces/Suppliers/dataSuppliers';
import { Router } from '@angular/router';
import { AlertsService } from '../../services/alerts.service';


@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

  supplierList: supplierInterface[] = [];
  supplierListDelete: supplierInterface[] = [];
  selectedSupplier: supplierInterface | null = null;
  countriesList: any = [];
  searchTerm: string  = '';
  deleteMode = false;
  defaultImageURL: string = 'https://cdn-icons-png.flaticon.com/512/2748/2748558.png';

  constructor(private service: SupplierServiceService, private router: Router, private alertsService: AlertsService) { }

  ngOnInit(): void {
    this.loadlist();
    this.loadListDelete();
  }

  private loadlist() {
    this.service.getSuppliers().subscribe((res)=>{
      console.log(res);
      this.supplierList = res;
    })
  }

  private loadListDelete(){
    this.service.getDeleteSuppliers().subscribe((res) => {
      this.supplierListDelete = res;
    })
  }

  public delete(id: number) {
    this.alertsService.showConfirmation('Are you sure you want to delete this supplier?').then((isConfirmed) => {
      if (isConfirmed) {
        this.service.deleteSupplier(id).subscribe(() => {
          this.loadlist();
          this.loadListDelete();
        });
      }
    });
  }

  public edit(code: number) {
    this.alertsService.showConfirmation('Are you sure you want edit this supplier?').then((isConfirmed) => {
      if (isConfirmed) {
        this.router.navigate(['/suppliers' + '/' + code]);
      }
    });
  }
  

  public handleImageError(event: any) {
    event.target.src = this.defaultImageURL;
  }

  public detailsSupp(id: number): void {
    this.router.navigate(['/suppliers/details' + '/' + id]);
  }

  public changeMode(){
    this.deleteMode = !this.deleteMode;
  }

  public restSupp(id: number){
    this.alertsService.showConfirmation('Are you sure you want to restore this supplier?').then((isConfirmed) => {
      if (isConfirmed) {
        this.service.restoreSupplier(id).subscribe(() => {
          this.loadListDelete();
          this.loadlist();
        });
      }
    });
  }
}
