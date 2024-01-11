import { Component, OnInit } from '@angular/core';
import { SupplierServiceService } from '../../services/supplier-service.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { supplierInterface } from '../../interfaces/dataSuppliers';
import { sectorInterface } from '../../interfaces/dataSectors';
import { SectorServiceService } from '../../services/sector-service.service';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.css']
})
export class CreateSupplierComponent implements OnInit {

  supplier: supplierInterface = {
    name: '',
    sectors: {
      sectorName: '',
      created: new Date()
    },
    cuit: '',
    email: '',
    phone: undefined,
    web: '',
    street: '',
    number: 0,
    postalCode: '',
    city: '',
    province: '',
    country: '',
    iva: 'Other'
  };
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  sectorsList: sectorInterface[] = [];

  public editMode: boolean = false;
  private editSupplierCode: number | null = null;

  constructor(private service: SupplierServiceService, private router: Router, private route: ActivatedRoute,private serviceSector: SectorServiceService ) {}

  ngOnInit(): void {

    this.serviceSector.getSectors().subscribe ((res)=>{
      this.sectorsList = res;
    })

    this.route.params.subscribe((params) => {
      const codeParam = params['id'];
      if (codeParam) {
        this.editMode = true;
        this.editSupplierCode = +codeParam;
        this.loadSupplierData();
        this.selectCountry();
        this.selectState();
      }
    });

    this.service.getCountries().subscribe((data: any) => {
      this.countries = data;
    });

  }

  public submitForm(form: NgForm) {
    if (this.editMode) {
      const editSupplier: supplierInterface = this.editingSupplier(form);
      this.service.updateSupplier(editSupplier);
    } else {
      this.service.addSupplier(form.value);
    }
    this.router.navigate(['/suppliers']);
  }

  private loadSupplierData() {
    if (this.editSupplierCode !== null) {
      const currentSupplier = this.service.getSupplier(this.editSupplierCode);
      if (currentSupplier) {
        this.supplier = { ...currentSupplier };
      }
    }
  }
  
  private editingSupplier(form: NgForm): supplierInterface {
    return {
      code: this.editSupplierCode || 0,
      codeSupp: form.value.codeSupp,
      name: form.value.name,
      sectors: form.value.sector,
      cuit: form.value.cuit,
      email: form.value.email,
      web: form.value.web,
      phone: form.value.phone,
      street: form.value.street,
      number: form.value.number,
      postalCode: form.value.postalCode,
      city: form.value.city,
      province: form.value.province,
      country: form.value.country,
      iva: form.value.iva
    };
  }

  public selectCountry(){
    this.service.getStates().subscribe((data: any) => {
      this.states = data.filter((state: any) => (state.country_name === this.supplier.country));
    });
  }

  public selectState(){
    this.service.getCities().subscribe((data: any) => {
      this.cities = data.filter((cities: any) => (cities.state_name === this.supplier.province));
    })
  }
}