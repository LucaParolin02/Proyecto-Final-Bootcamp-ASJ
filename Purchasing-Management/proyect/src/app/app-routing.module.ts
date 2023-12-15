import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { ProductsComponent } from './components/products/products.component';
import { PurchaseOrdersComponent } from './components/purchase-orders/purchase-orders.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { CreateSupplierComponent } from './components/create-supplier/create-supplier.component';
import { CreateProductComponent } from './components/create-product/create-product.component';

const routes: Routes = [
  {path:'main-menu', component: MainMenuComponent},
  {path:'products',component: ProductsComponent},
  {path:'purchase-orders',component: PurchaseOrdersComponent},
  {path:'suppliers',component:SuppliersComponent},
  {path:'suppliers/create-supplier',component:CreateSupplierComponent},
  {path:'products/create-product',component:CreateProductComponent},
  {path:'',component:MainMenuComponent},
  {path:'**', pathMatch: 'full', redirectTo: 'main-menu'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
