import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './_services/auth.service';
import { AuthInterceptor } from './_helpers/auth.interceptor';
import { TableComponent } from './components/table/table.component';
import { TableService } from './_services/table.service';
import { AuthGuard } from './_guards/auth.guard';
import { ProductComponent } from './components/product/product.component';
import { ProductService } from './_services/product.service';
import { OrderService } from './_services/order.service';
import { ListOrderComponent } from './components/order/list-order/list-order.component';
import { CreateOrderComponent } from './components/order/create-order/create-order.component';
import { DetailsOrderComponent } from './components/order/details-order/details-order.component';
import { OrderProductService } from './_services/order-product.service';

const routes: Route[] = [
  { path: '', component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tables', component: TableComponent, canActivate: [ AuthGuard ] },
  { path: 'products', component: ProductComponent, canActivate: [ AuthGuard ] },
  { path: 'orders', component: ListOrderComponent, canActivate: [ AuthGuard ] },
  { path: 'order/:id/details', component: DetailsOrderComponent, canActivate: [ AuthGuard ] }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    TableComponent,
    ProductComponent,
    ListOrderComponent,
    CreateOrderComponent,
    DetailsOrderComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [
    AuthService,
    TableService,
    ProductService,
    OrderService,
    OrderProductService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    CreateOrderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
