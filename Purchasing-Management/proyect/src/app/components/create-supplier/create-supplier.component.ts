import { Component, OnInit } from '@angular/core';
import { SupplierServiceService } from '../../services/supplier-service.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { supplierInterface } from '../../interfaces/Suppliers/dataSuppliers';
import { SectorServiceService } from '../../services/sector-service.service';
import { sectorInterface } from '../../interfaces/Suppliers/dataSector';
import { vatInterface } from '../../interfaces/Suppliers/dataVat';

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
  states: any[] = [];
  sectorsList: sectorInterface[] = [];
  vatConditionlist: vatInterface[] = [];


  public editMode: boolean = false;
  private editSupplierCode: number | null = null;

  constructor(
    private service: SupplierServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private serviceSector: SectorServiceService
  ) {}

  ngOnInit(): void {
    this.serviceSector.getSectors().subscribe((res) => {
      this.sectorsList = res;
    });

    this.route.params.subscribe((params) => {
      const codeParam = params['id'];
      if (codeParam) {
        this.editMode = true;
        this.editSupplierCode = +codeParam;
        this.loadSupplierData();
      }
    });

    this.service.getCountries().subscribe((data: any) => {
      this.countries = data;
    });
  }

  public submitForm(form: NgForm) {
    if (this.editMode) {
      const editSupplier: supplierInterface = this.editingSupplier(form);
      editSupplier.sector = { ...form.value.sectors };
      if (editSupplier.id){
        this.service.updateSupplier(editSupplier.id, editSupplier).subscribe(() => {
          this.router.navigate(['/suppliers']);
        });
      }
    } else {
      console.log(form.value);
      this.service.addSupplier(form.value).subscribe(() => {
        this.router.navigate(['/suppliers']);
      });
    }
  }

  private loadSupplierData() {
    if (this.editSupplierCode !== null) {
      this.service.getSupplier(this.editSupplierCode).subscribe((res) => {
        const currentSupplier = res;
        if (currentSupplier) {
          this.supplier = { ...currentSupplier};
          this.selectCountry();
          this.selectSector();
        }
      });
    }
  }

  private editingSupplier(form: NgForm): supplierInterface {
    return {
        id: this.editSupplierCode || 0,
        code: form.value.code, 
        name: form.value.name,
        cuit: form.value.cuit,
        email: form.value.email,
        web: form.value.web,
        phone: form.value.phone,
        street: form.value.street,
        snumber: form.value.snumber, 
        zip: form.value.postalCode, 
        city: form.value.city,
        contact: form.value.contact, 
        vatCondition: form.value.vatCondition, 
        sector: form.value.sector, 
        province: form.value.province, 
    };
}

public selectCountry() {
  const selectedCountry = this.countries.find(country => country.name === this.supplier.province.country);
  if (selectedCountry) {
    this.service.getStates(selectedCountry.id).subscribe((data: any) => {
      this.states = data;
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
}