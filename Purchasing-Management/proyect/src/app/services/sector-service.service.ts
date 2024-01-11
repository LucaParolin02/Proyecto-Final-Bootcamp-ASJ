import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { sectorInterface } from '../interfaces/dataSectors';

@Injectable({
  providedIn: 'root'
})
export class SectorServiceService {
  private sectors: sectorInterface[] = [];
  constructor() { }


}
