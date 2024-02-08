import { Component } from '@angular/core';
import { imagesInterface } from '../../../interfaces/Products/dataImages';
import { ProductServiceService } from '../../../services/product-service.service';
import { AlertsService } from '../../../services/alerts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { productsInterface } from '../../../interfaces/Products/dataProducts';

@Component({
  selector: 'app-products-images',
  templateUrl: './products-images.component.html',
  styleUrl: './products-images.component.css'
})
export class ProductsImagesComponent {

  imagesList: imagesInterface[] = [];
  imagesDeletedList: imagesInterface[] = [];
  allImagesList: imagesInterface[] = [];

  productImage: imagesInterface = {
    url: null,
    product: {
      name: '',
      sku: '',
      supplier: {
      name: '',
      code: '',
      logo: undefined,
      cuit: '',
      web: undefined,
      email: '',
      phone: '',
      street: undefined,
      zip: '',
      city: '',
      contact:{
        name: '',
        lastName: '',
        phone: '',
        email: '',
        role: '',
      },
      vatCondition:{
          name: '',
      },
      sector:{
        name: '',
      },
      province:{
          name: '',
          country: {
            name: ''
          }
      }},
      desc: '',
      price: 0,
      category: {
        name: ''
      }
    }
  }

  actualProduct: productsInterface = {
      name: '',
      sku: '',
      supplier: {
      name: '',
      code: '',
      logo: undefined,
      cuit: '',
      web: undefined,
      email: '',
      phone: '',
      street: undefined,
      zip: '',
      city: '',
      contact:{
        name: '',
        lastName: '',
        phone: '',
        email: '',
        role: '',
      },
      vatCondition:{
          name: '',
      },
      sector:{
        name: '',
      },
      province:{
          name: '',
          country: {
            name: ''
          }
      }},
      desc: '',
      price: 0,
      category: {
        name: ''
      }
    }
  
  deleteMode = false;
  editMode = false;
  editImageCode = 0;

  constructor(private prodService: ProductServiceService,private alertsService: AlertsService,private router: Router,private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const codeParam = params['idImage'];
      if (codeParam) {
        this.editMode = true;
        this.editImageCode = +codeParam;
        this.loadImageData(this.editImageCode);
      }
    });

    this.route.params.subscribe((params) => {
      const codeProduct = params['id'];
      if (codeProduct) {
        this.loadProduct(codeProduct);
        this.loadImages(codeProduct);
        this.loadListDelete(codeProduct);
      }
    });

    this.loadAllImages();
  }

  public submitForm(myForm: NgForm): void {
    const image: imagesInterface = this.buildImage(myForm);
    console.log(image);
    if (this.editMode) {
      if (myForm.valid && this.isUrlValid()) {
        this.prodService.editImage(this.editImageCode, image).subscribe(() => {
          this.alertsService.showEditedSuccess('Image edited successfully!');
          this.loadImages(this.actualProduct.id!);
          this.router.navigate(['/products/details', this.actualProduct.id, 'images']);
        });
      }
    } else {
      if (myForm.valid && this.isUrlValid()) {
        this.prodService.addImage(image).subscribe(() => {
          this.alertsService.showSuccess('Image added successfully!');
          this.loadImages(this.actualProduct.id!);
          this.productImage.url = '';
          myForm.reset();
        });
      }
    }
  }

  private loadImages(id: number): void {
    this.prodService.getImagesByProd(id).subscribe((res) => {
      this.imagesList = res;
    });
  }

  private loadListDelete(id: number): void {
    this.prodService.getDeletedImagesByProd(id).subscribe((res) => {
      this.imagesDeletedList = res;
    })
  }

  private loadAllImages(){
    this.prodService.getAllImages().subscribe((res) => {
      this.allImagesList = res;
    })
  }

  private loadProduct(id: number) {
    this.prodService.getProduct(id).subscribe((res) => {
      this.actualProduct = res;
    })
  }

  public isUrlValid(): boolean {
    return !this.allImagesList.some(
      (i) => i.url === this.productImage.url && i.id !== this.productImage.id
      );
  }

  public delete(id: number) {
    this.alertsService.showConfirmation('Are you sure you want to delete this image?').then((isConfirmed) => {
      if (isConfirmed) {
        this.prodService.deleteImage(id).subscribe(
          () => {
            this.loadImages(this.actualProduct.id!);
            this.loadListDelete(this.actualProduct.id!);
          },
          (error) => {
            console.log(error);
            if (error.status === 403) {
              this.alertsService.showError(error.error);
              this.router.navigate(['/products/details', this.actualProduct.id, 'images']);
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

  public restImage(id: number){
    this.alertsService.showConfirmation('Are you sure you want to restore this image?').then((isConfirmed) => {
      if (isConfirmed) {
        this.prodService.restoreImage(id).subscribe(() => {
          this.loadListDelete(this.actualProduct.id!);
          this.loadImages(this.actualProduct.id!);
        });
      }
    });
  }

  public goEdit(code: number) {
    this.alertsService.showConfirmation('Are you sure you want edit this image?').then((isConfirmed) => {
      if (isConfirmed) {
        this.router.navigate(['/products/details', this.actualProduct.id, 'images',code]);
      }
    });
  }

  private buildImage(form: NgForm): imagesInterface {
    return {
      url: form.value.url,
      product: { id : this.actualProduct.id  }
    };
  }

  private loadImageData(imageCode: number) {
    if (imageCode !== null) {
      this.prodService.getImage(imageCode).subscribe((res) => {
        const currentImage = res;
        if (currentImage) {
          console.log(currentImage);
          this.productImage = { ...currentImage };
        }
      });
    }
  }

  public handleImageError(event: any) {
    event.target.src = 'https://cdn-icons-png.flaticon.com/512/2748/2748558.png';
}

}
