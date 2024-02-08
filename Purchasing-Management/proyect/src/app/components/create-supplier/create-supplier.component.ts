import { Component, OnInit } from '@angular/core';
import { SupplierServiceService } from '../../services/supplier-service.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { supplierInterface } from '../../interfaces/Suppliers/dataSuppliers';
import { sectorInterface } from '../../interfaces/Suppliers/dataSector';
import { vatInterface } from '../../interfaces/Suppliers/dataVat';
import { contactInterface } from '../../interfaces/Suppliers/dataContact';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.css']
})
export class CreateSupplierComponent implements OnInit {

  supplier: supplierInterface = {
    name: '',
    code: '',
    logo: undefined,
    cuit: '',
    web: undefined,
    email: '',
    phone: '',
    street: undefined,
    zip: '',
    city: '',
    contact:{
      name: '',
      lastName: '',
      phone: '',
      email: '',
      role: '',
    },
    vatCondition:{
        name: '',
    },
    sector:{
      name: '',
    },
    province:{
        name: '',
        country: {
          name: ''
        }
    }
  };

  countries: any[] = [];
  provinces: any[] = [];
  sectorsList: sectorInterface[] = [];
  vatConditionList: vatInterface[] = [];
  supplierList: supplierInterface[] = [];
  supplierListDeleted: supplierInterface[] = [];
  public editMode: boolean = false;
  private editSupplierCode: number | null = null;

  constructor(
    private service: SupplierServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertsService
  ) {}

  ngOnInit(): void {
    this.loadData();

    this.route.params.subscribe((params) => {
      const codeParam = params['id'];
      if (codeParam) {
        console.log(codeParam);
        this.editMode = true;
        this.editSupplierCode = +codeParam;
        this.loadSupplierData();
      }
    });

    this.service.getCountries().subscribe((data: any) => {
      this.countries = data;
    });
  }

  private loadData(): void{
    this.loadSectors();
    this.loadVats();
    this.loadSuppliers();
    this.loadSuppliersDeleted();
  }

  private loadSectors(): void {
    this.service.getSectors().subscribe((res) => {
      this.sectorsList = res;
    });
  }

  private loadVats(): void {
    this.service.getVats().subscribe((res) => {
      this.vatConditionList = res;
    })
  }

  private loadSuppliers(): void{
    this.service.getSuppliers().subscribe((res) => {
      this.supplierList = res;
    })
  }

  private loadSuppliersDeleted(): void {
    this.service.getDeleteSuppliers().subscribe((res) => {
      this.supplierListDeleted = res;
    })
  }

  public submitForm(form: NgForm) {
    const supplier: supplierInterface = this.buildSupplier(form);
    const contact: contactInterface = {
      name: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      phone: form.value.phoneContact,
      role: form.value.role
    }
    if (this.editMode) {
      supplier.id = this.editSupplierCode || 0;
      supplier.contact = { id: supplier.contact.id}   
      if (this.supplier.contact.id){
        this.service.editContact(this.supplier.contact.id , contact).subscribe((res) => {
          supplier.contact = { id: res.id}        
          if (supplier.id){
            this.service.updateSupplier(supplier.id, supplier).subscribe(() => {
              this.alertService.showEditedSuccess("Supplier edited successfully!");
              this.router.navigate(['/suppliers']);
            });
          }
        })
      }
    } else {
      this.service.addContact(contact).subscribe((res) => {
        supplier.contact = { id: res.id}
        console.log(supplier);
        this.service.addSupplier(supplier).subscribe(() => {
          this.alertService.showSuccess("Supplier added successfully!");
          this.router.navigate(['/suppliers']);
        });
      })
    }
  }

  private loadSupplierData() {
    if (this.editSupplierCode !== null) {
      this.service.getSupplier(this.editSupplierCode).subscribe((res) => {
        const currentSupplier = res;
        if (currentSupplier) {
          console.log(currentSupplier);
          this.supplier = { ...currentSupplier};
          this.selectCountry(currentSupplier.province.country.id);
          this.selectSector();
        }
      });
    }
  }

  private buildSupplier(form: NgForm): supplierInterface {
    return {
        logo: form.value.logo,
        code: form.value.code, 
        name: form.value.name,
        cuit: form.value.cuit,
        email: form.value.email,
        web: form.value.web,
        phone: form.value.phone,
        street: form.value.street,
        snumber: form.value.snumber, 
        zip: form.value.zip, 
        city: form.value.city,
        contact: {}, 
        vatCondition: {id: parseInt(form.value.vatCondition)}, 
        sector: {id: parseInt(form.value.sector)}, 
        province: {id: parseInt(form.value.province)},
    };
}

public selectCountry(id: number) {
  if (id) {
    this.service.getStates(id).subscribe((data: any) => {
      this.provinces = data;
      console.log(this.provinces);
    });
  }
}

  public selectSector() {
    if (this.supplier.sector && this.sectorsList) {
      const selectedSector = this.sectorsList.find(sector => sector.name === this.supplier.sector.name);
      if (selectedSector) {
        this.supplier.sector = selectedSector;
      }
    }
  }

  public isNameValid(): boolean {
    const allSuppliers = [...this.supplierList,...this.supplierListDeleted];
    return !allSuppliers.some(
      (s) => s.name === this.supplier.name && s.id !== this.supplier.id
      );
  }

  public isCodeValid(): boolean {
    const allSuppliers = [...this.supplierList,...this.supplierListDeleted];
    return !allSuppliers.some(
      (s) => s.code === this.supplier.code && s.id !== this.supplier.id
      );
  }

  public isCuitValid(): boolean {
    const allSuppliers = [...this.supplierList,...this.supplierListDeleted];
    return !allSuppliers.some(
      (s) => s.cuit === this.supplier.cuit && s.id !== this.supplier.id
      );
  }

  public isEmailValid(): boolean {
    const allSuppliers = [...this.supplierList,...this.supplierListDeleted];
    return !allSuppliers.some(
      (s) => s.email === this.supplier.email && s.id !== this.supplier.id
      );
  }

  public isPhoneValid(): boolean {
    const allSuppliers = [...this.supplierList,...this.supplierListDeleted];
    return !allSuppliers.some(
      (s) => s.phone === this.supplier.phone && s.id !== this.supplier.id
      );
  }


}