import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { ProductsComponent } from './components/products/products.component';
import { PurchaseOrdersComponent } from './components/purchase-orders/purchase-orders.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { CreateSupplierComponent } from './components/create-supplier/create-supplier.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { CreatePurchaseOrderComponent } from './components/create-purchase-order/create-purchase-order.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { SuppDetailsComponent } from './components/suppliers/supplier-details/supp-details/supp-details.component';
import { ProductDetailComponent } from './components/products/products-details/product-detail/product-detail.component';
import { ProductsImagesComponent } from './components/products/products-images/products-images.component';
import { ProductsCategoriesComponent } from './components/products/products-categories/products-categories.component';
import { SectorsComponent } from './components/create-supplier/sectors/sectors.component';

const routes: Routes = [
  {path:'',component:MainMenuComponent},
  {path:'home', component: MainMenuComponent},
  {path: 'suppliers',
    children:[
    {path:"", component: SuppliersComponent},
    {path:"sectors/:id",component: SectorsComponent},
    {path: 'sectors',component: SectorsComponent},
    {path:'form', component: CreateSupplierComponent},
    {path:':id', component: CreateSupplierComponent},
    {path: 'details/:id',component: SuppDetailsComponent}
  ]},
  {path:'products',
    children:[
      {path:"", component: ProductsComponent},
      {path: 'categories/:id',component: ProductsCategoriesComponent},
      {path: 'categories',component: ProductsCategoriesComponent},
      {path:'form',component:CreateProductComponent},
      {path:':id',component:CreateProductComponent},
      {path:'details/:id',component: ProductDetailComponent},
      {path: 'images/:id',component: ProductsImagesComponent}
    ]
  },
  {path:'orders',
    children:[
      {path:"", component: PurchaseOrdersComponent},
      {path:'form', component: CreatePurchaseOrderComponent},
      {path:':id',component: CreatePurchaseOrderComponent},
      {path:'details/:id',component: OrderDetailsComponent},
    ]
  },
  {path:'**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
