import { Component, OnInit } from '@angular/core';
import { SupplierServiceService } from '../../services/supplier-service.service';
import { NgForm } from '@angular/forms';
import { supplierInterface } from '../../interfaces/dataSuppliers';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrl: './create-supplier.component.css'
})
export class CreateSupplierComponent implements OnInit {

  supplier: supplierInterface = {
    name: '',
    field: '',
    cuit: '',
    email: '',
    addres: '',
    iva: 'Other'
  }

  public editMode: boolean = false;
  private editSupplierCode: number | null = null;

  constructor(private service: SupplierServiceService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const codeParam = params['id'];
      if (codeParam) {
        this.editMode = true;
        this.editSupplierCode = +codeParam; // Convierte el código a número
        this.loadSupplierData();
      }
    });
  }

  public submitForm(form: NgForm){
    if (this.editMode) {
      const editSupplier: supplierInterface = this.editingSupplier(form);
      this.service.updateSupplier(editSupplier);
    } else {
      this.service.addSupplier(form.value);
    }
    this.router.navigate(['/suppliers']);
  }

  private loadSupplierData(){
    if (this.editSupplierCode !== null) {
      const currentSupplier = this.service.getSupplier(this.editSupplierCode);
      if (currentSupplier) {
        this.supplier = { ...currentSupplier }; // spread/rest
      }
    }
  }
  
  private editingSupplier(form: NgForm): supplierInterface {
    return {
      code: this.editSupplierCode || 0,
      name: form.value.name,
      field: form.value.field,
      cuit: form.value.cuit,
      email: form.value.email,
      addres: form.value.addres,
      iva: form.value.iva,
    };
  }
}
