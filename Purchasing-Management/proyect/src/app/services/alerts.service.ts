import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() { }

  showSuccess(message: string) {
    Swal.fire({
      title: "Good job!",
      text: message,
      icon: "success"
    });
    }
}
