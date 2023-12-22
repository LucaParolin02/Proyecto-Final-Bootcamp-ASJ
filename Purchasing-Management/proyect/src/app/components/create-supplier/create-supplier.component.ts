import { Component, OnInit } from '@angular/core';
import { SupplierServiceService } from '../../services/supplier-service.service';
import { NgForm } from '@angular/forms';
import { supplierInterface } from '../../interfaces/dataSuppliers';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrl: './create-supplier.component.css'
})
export class CreateSupplierComponent implements OnInit {

  supplier: supplierInterface = {
    name: '',
    cuit: '',
    email: '',
    addres: '',
    fiscalData: '',
  }

  constructor(private service: SupplierServiceService){}

  ngOnInit(): void {
    
  }

  public create(form: NgForm){
    this.service.addSupplier(form.value);
  }

}
