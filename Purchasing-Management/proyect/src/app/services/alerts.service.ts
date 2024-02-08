import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() { }

  showSuccess(message: string) {
    Swal.fire({
      title: "Added successfully!",
      text: message,
      icon: "success"
    });
    }

  shoewEditedSucces(message: string){
    Swal.fire({
      title: "Edit successfully!",
      text: message,
      icon: "success"
    })
  }

  showConfirmation(message: string): Promise<boolean> {
    return Swal.fire({
      title: 'Are you sure?',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, proceed!'
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  showError(message: string) {
    Swal.fire({
      title: "Error!",
      text: message,
      icon: "error"
    });
  }
  
}
