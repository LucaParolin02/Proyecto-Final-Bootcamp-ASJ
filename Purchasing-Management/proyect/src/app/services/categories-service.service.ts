import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { categoryInterface } from '../interfaces/Products/dataCategories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesServiceService {
  private categories: categoryInterface[] = [
    { name: 'Aperitivo'}, 
    { name: 'Periferico'}, 
    { name: 'Mouse'}, 
    { name: 'Others'},
  ];
  constructor() { }

  public getCategories(): Observable<categoryInterface[]> {
    return of(this.categories);
  }

  public createCategory(catName: string): Observable<categoryInterface> {
    const newCategory: categoryInterface = {
      name: catName
    };
    this.categories.push(newCategory);
    return of(newCategory);
  } 
}
