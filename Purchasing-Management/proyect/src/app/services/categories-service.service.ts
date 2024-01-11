import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { categoryInterface } from '../interfaces/dataCategories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesServiceService {
  private categories: categoryInterface[] = [];
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
