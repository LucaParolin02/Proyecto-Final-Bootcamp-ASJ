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

const routes: Routes = [
  {path:'',component:MainMenuComponent},
  {path:'home', component: MainMenuComponent},
  {path: 'suppliers',
    children:[
    {path:"", component: SuppliersComponent},
    {path:'add', component: CreateSupplierComponent},
    {path:':id', component: CreateSupplierComponent}
  ]},
  {path:'products',
    children:[
      {path:"", component: ProductsComponent},
      {path:'add',component:CreateProductComponent},
      {path:':id',component:CreateProductComponent}
    ]
  },
  {path:'orders',
    children:[
      {path:"", component: PurchaseOrdersComponent},
      {path:'add', component: CreatePurchaseOrderComponent},
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
