import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { categoryInterface } from '../interfaces/dataCategories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesServiceService {
  private categories: categoryInterface[] = [
    { catName: 'Aperitivo', created: new Date() },
    { catName: 'Periferico', created: new Date() },
    { catName: 'Mouse', created: new Date() },
    { catName: 'Others', created: new Date() }
  ];
  constructor() { }

  public getCategories(): Observable<categoryInterface[]> {
    return of(this.categories);
  }

  public createCategory(catName: string): Observable<categoryInterface> {
    const newCategory: categoryInterface = {
      catName: catName,
      created: new Date()
    };
    this.categories.push(newCategory);
    return of(newCategory);
  } 
}
