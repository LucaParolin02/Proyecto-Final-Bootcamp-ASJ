import { Component, OnInit } from '@angular/core';
import { SupplierServiceService } from '../../../services/supplier-service.service';
import { sectorInterface } from '../../../interfaces/Suppliers/dataSector';
import { NgForm } from '@angular/forms';
import { AlertsService } from '../../../services/alerts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrl: './sectors.component.css'
})

export class SectorsComponent implements OnInit{

  sectorsList: sectorInterface[] = [];
  sectorsDeletedList: sectorInterface[] = [];
  sector: sectorInterface = {
    name: '',
  }
  deleteMode = false;
  editMode = false;
  editSectorCode = 0;

  constructor(private suppService: SupplierServiceService,private alertsService: AlertsService,private router: Router,private route: ActivatedRoute){}

  ngOnInit(): void {
    this.loadSectors();
    this.loadListDelete();

    this.route.params.subscribe((params) => {
      const codeParam = params['id'];
      if (codeParam) {
        this.editMode = true;
        this.editSectorCode = +codeParam;
        this.loadSectorData(this.editSectorCode);
      }
    });
}

  public submitForm(myForm: NgForm): void {
    const sector: sectorInterface = this.buildSector(myForm);
    if (this.editMode) {
      if (myForm.valid && this.isNameValid()) {
        this.suppService.editSector(this.editSectorCode, sector).subscribe(() => {
          this.loadSectors();
          this.router.navigate(['/suppliers/sectors']);
        });
      }
    } else {
      if (myForm.valid && this.isNameValid()) {
        this.suppService.addSector(this.sector).subscribe(() => {
          this.loadSectors();
          this.sector.name = '';
        });
      }
    }
  }

  private loadSectors(): void {
    this.suppService.getSectors().subscribe((res) => {
      this.sectorsList = res;
    });
  }

  private loadListDelete(){
    this.suppService.getDeletedSectors().subscribe((res) => {
      this.sectorsDeletedList = res;
    })
  }

  public isNameValid(): boolean {
    return !this.sectorsList.some(
      (s) => s.name === this.sector.name && s.id !== this.sector.id
      );
  }

  public delete(id: number) {
    this.alertsService.showConfirmation('Are you sure you want to delete this sector?').then((isConfirmed) => {
      if (isConfirmed) {
        this.suppService.deleteSector(id).subscribe(
          () => {
            this.loadSectors();
            this.loadListDelete();
          },
          (error) => {
            console.log(error);
            if (error.status === 403) {
              this.alertsService.showError(error.error);
              this.router.navigate(['/suppliers/sectors']);
            } else {
              this.alertsService.showError("An unexpected error occurred. Please try again later.");
            }
          }
        );
      }
    });
  }

  public changeMode(){
    this.deleteMode = !this.deleteMode;
  }

  public restSector(id: number){
    this.alertsService.showConfirmation('Are you sure you want to restore this sector?').then((isConfirmed) => {
      if (isConfirmed) {
        this.suppService.restoreSector(id).subscribe(() => {
          this.loadListDelete();
          this.loadSectors();
        });
      }
    });
  }

  public goEdit(code: number) {
    this.alertsService.showConfirmation('Are you sure you want edit this sector?').then((isConfirmed) => {
      if (isConfirmed) {
        this.router.navigate(['/suppliers' + '/sectors' + '/' + code]);
      }
    });
  }

  private buildSector(form: NgForm): sectorInterface {
    return { 
        name: form.value.name,
    };
}

private loadSectorData(sectorCode: number) {
  if (sectorCode !== null) {
    this.suppService.getSectorById(sectorCode).subscribe((res) => {
      const currentSector = res;
      if (currentSector) {
        console.log(currentSector);
        this.sector = { ...currentSector };
      }
    });
  }
}

}
