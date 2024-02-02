import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { sectorInterface } from '../interfaces/Suppliers/dataSector';

@Injectable({
  providedIn: 'root'
})
export class SectorServiceService {
  private sectors: sectorInterface[] = [
    { name: 'Technology'},
    { name: 'Vehicles'}, 
    { name: 'Foods'}, 
    { name: 'Others'}, 
  ];
  constructor() { }

  public getSectors(): Observable<sectorInterface[]> {
    return of(this.sectors);
  }

  public createSector(name: string): Observable<sectorInterface> {
    const newSector: sectorInterface = {
      name: name,
    };
    this.sectors.push(newSector);
    return of(newSector);
  }
}
