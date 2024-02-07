import { Component, OnInit } from '@angular/core';
import { supplierInterface } from '../../../../interfaces/Suppliers/dataSuppliers';
import { SupplierServiceService } from '../../../../services/supplier-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-supp-details',
  templateUrl: './supp-details.component.html',
  styleUrl: './supp-details.component.css'
})
export class SuppDetailsComponent implements OnInit{

  currentSupplier: supplierInterface = {
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

  defaultImageURL: string = 'https://cdn-icons-png.flaticon.com/512/2748/2748558.png';

  constructor(private service: SupplierServiceService,private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.service.getSupplier(this.activatedRoute.snapshot.params['id']).subscribe((res) => {
      this.currentSupplier = res;
    })
  }

  public handleImageError(event: any) {
    event.target.src = this.defaultImageURL;
  }

}
