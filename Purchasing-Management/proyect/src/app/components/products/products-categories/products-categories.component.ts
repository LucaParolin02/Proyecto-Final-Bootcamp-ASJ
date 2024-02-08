import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { categoryInterface } from '../../../interfaces/Products/dataCategories';
import { ProductServiceService } from '../../../services/product-service.service';
import { AlertsService } from '../../../services/alerts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products-categories',
  templateUrl: './products-categories.component.html',
  styleUrl: './products-categories.component.css'
})
export class ProductsCategoriesComponent {

  categoriesList: categoryInterface[] = [];
  categoriesDeletedList: categoryInterface[] = [];
  category: categoryInterface = {
    name: '',
  }
  deleteMode = false;
  editMode = false;
  editCategoryCode = 0;

  constructor(private prodService: ProductServiceService,private alertsService: AlertsService,private router: Router,private route: ActivatedRoute){}

  ngOnInit(): void {
    this.loadCategories();
    this.loadListDelete();

    this.route.params.subscribe((params) => {
      const codeParam = params['id'];
      if (codeParam) {
        this.editMode = true;
        this.editCategoryCode = +codeParam;
        this.loadCategoryData(this.editCategoryCode);
      }
    });
}

  public submitForm(myForm: NgForm): void {
    const category: categoryInterface = this.buildCategory(myForm);
    if (this.editMode) {
      if (myForm.valid && this.isNameValid()) {
        this.prodService.editCategory(this.editCategoryCode, category).subscribe(() => {
          this.loadCategories();
          this.alertsService.showEditedSuccess('Category edited successfully!');
          this.router.navigate(['/products/categories']);
        });
      }
    } else {
      if (myForm.valid && this.isNameValid()) {
        this.prodService.addCategory(this.category).subscribe(() => {
          this.alertsService.showSuccess('Category added successfully!');
          this.loadCategories();
          this.category.name = '';
          myForm.reset();
        });
      }
    }
  }

  private loadCategories(): void {
    this.prodService.getCategories().subscribe((res) => {
      this.categoriesList = res;
    });
  }

  private loadListDelete(){
    this.prodService.getDeletedCategories().subscribe((res) => {
      this.categoriesDeletedList = res;
    })
  }

  public isNameValid(): boolean {
    return !this.categoriesList.some(
      (c) => c.name === this.category.name && c.id !== this.category.id
      );
  }

  public delete(id: number) {
    this.alertsService.showConfirmation('Are you sure you want to delete this category?').then((isConfirmed) => {
      if (isConfirmed) {
        this.prodService.deleteCategory(id).subscribe(
          () => {
            this.loadCategories();
            this.loadListDelete();
          },
          (error) => {
            console.log(error);
            if (error.status === 403) {
              this.alertsService.showError(error.error);
              this.router.navigate(['/products/categories']);
            } else {
              this.alertsService.showError("An unexpected error occurred. Please try again later.");
            }
          }
        );
      }
    });
  }

  public changeMode(){
    this.deleteMode = !this.deleteMode;
  }

  public restCategory(id: number){
    this.alertsService.showConfirmation('Are you sure you want to restore this category?').then((isConfirmed) => {
      if (isConfirmed) {
        this.prodService.restoreCategory(id).subscribe(() => {
          this.loadListDelete();
          this.loadCategories();
        });
      }
    });
  }

  public goEdit(code: number) {
    this.alertsService.showConfirmation('Are you sure you want edit this category?').then((isConfirmed) => {
      if (isConfirmed) {
        this.router.navigate(['/products' + '/categories' + '/' + code]);
      }
    });
  }

  private buildCategory(form: NgForm): categoryInterface {
    return { 
        name: form.value.name,
    };
}

private loadCategoryData(categoryCode: number) {
  if (categoryCode !== null) {
    this.prodService.getCategoryById(categoryCode).subscribe((res) => {
      const currentCategory = res;
      if (currentCategory) {
        console.log(currentCategory);
        this.category = { ...currentCategory };
      }
    });
  }
}

}
