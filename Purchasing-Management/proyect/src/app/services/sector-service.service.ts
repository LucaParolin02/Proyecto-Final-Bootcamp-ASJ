import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { sectorInterface } from '../interfaces/dataSectors';

@Injectable({
  providedIn: 'root'
})
export class SectorServiceService {
  private sectors: sectorInterface[] = [
    { sectorName: 'Technology', created: new Date() },
    { sectorName: 'Vehicles', created: new Date() },
    { sectorName: 'Foods', created: new Date() },
    { sectorName: 'Others', created: new Date() }
  ];
  constructor() { }

  public getSectors(): Observable<sectorInterface[]> {
    return of(this.sectors);
  }

  public createsector(sectorName: string): Observable<sectorInterface> {
    const newSector: sectorInterface = {
      sectorName: sectorName,
      created: new Date()
    };
    this.sectors.push(newSector);
    return of(newSector);
  }
}
