import { Component, OnInit } from '@angular/core';
import { SupplierServiceService } from '../../../services/supplier-service.service';
import { sectorInterface } from '../../../interfaces/Suppliers/dataSector';
import { NgForm } from '@angular/forms';
import { AlertsService } from '../../../services/alerts.service';

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrl: './sectors.component.css'
})

export class SectorsComponent implements OnInit{

  sectorsList: sectorInterface[] = [];
  sector: sectorInterface = {
    name: '',
  }
  deleteMode = false;

  constructor(private suppService: SupplierServiceService,private alertsService: AlertsService){}

  ngOnInit(): void {
      this.loadSectors();
  }

  public submitForm(myForm: NgForm): void {
    if (myForm.valid && this.isNameValid()) {
       this.suppService.addSector(this.sector).subscribe(() => {
          this.loadSectors();
          this.sector.name = '';
      });
  }
}

  private loadSectors(): void {
    this.suppService.getSectors().subscribe((res) => {
      this.sectorsList = res;
    });
  }

  public isNameValid(): boolean {
    return !this.sectorsList.some(
      (s) => s.name === this.sector.name && s.id !== this.sector.id
      );
  }

  public delete(id: number) {
    this.alertsService.showConfirmation('Are you sure you want to delete this sector?').then((isConfirmed) => {
      if (isConfirmed) {
        this.suppService.deleteSector(id).subscribe(() => {
          this.loadSectors();
          //this.loadListDelete();
        });
      }
    });
  }

}
