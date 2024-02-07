import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { ProductsComponent } from './components/products/products.component';
import { PurchaseOrdersComponent } from './components/purchase-orders/purchase-orders.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CreateSupplierComponent } from './components/create-supplier/create-supplier.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { CreatePurchaseOrderComponent } from './components/create-purchase-order/create-purchase-order.component';
import { FormsModule } from '@angular/forms';
import { CuitPipePipe } from './pipes/cuit-pipe.pipe';
import { HttpClientModule } from '@angular/common/http';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { ProductDetailComponent } from './components/products/products-details/product-detail/product-detail.component';
import { SuppDetailsComponent } from './components/suppliers/supplier-details/supp-details/supp-details.component';
import { SearchPipe } from './pipes/search-supp.pipe';
import { CategoryFilterPipe } from './pipes/category-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    SuppliersComponent,
    ProductsComponent,
    PurchaseOrdersComponent,
    NavbarComponent,
    FooterComponent,
    CreateSupplierComponent,
    CreateProductComponent,
    CreatePurchaseOrderComponent,
    CuitPipePipe,
    OrderDetailsComponent,
    ProductDetailComponent,
    SuppDetailsComponent,
    SearchPipe,
    CategoryFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
