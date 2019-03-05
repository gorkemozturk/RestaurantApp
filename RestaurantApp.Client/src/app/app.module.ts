import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './_services/auth.service';
import { AuthInterceptor } from './_helpers/auth.interceptor';
import { TableService } from './_services/table.service';
import { AuthGuard } from './_guards/auth.guard';
import { ProductService } from './_services/product.service';
import { OrderService } from './_services/order.service';
import { OrderProductService } from './_services/order-product.service';
import { PaymentMethodService } from './_services/payment-method.service';
import { PaymentService } from './_services/payment.service';
import { StatisticsService } from './_services/statistics.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TableListComponent } from './components/table/table-list/table-list.component';
import { TableFormComponent } from './components/table/table-form/table-form.component';
import { ProductFormComponent } from './components/product/product-form/product-form.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { PaymentMethodListComponent } from './components/payment-method/payment-method-list/payment-method-list.component';
import { PaymentMethodFormComponent } from './components/payment-method/payment-method-form/payment-method-form.component';
import { OrderListComponent } from './components/order/order-list/order-list.component';
import { SummaryPipe } from './_helpers/summary.pipe';
import { OrderFormComponent } from './components/order/order-form/order-form.component';
import { OrderViewComponent } from './components/order/order-view/order-view.component';
import { OrderCompleteComponent } from './components/order/order-complete/order-complete.component';

const routes: Route[] = [
  { path: '', component: HomeComponent, canActivate: [ AuthGuard ] },

  // Authantications routes.
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  // Table components routes.
  { path: 'tables', component: TableListComponent, canActivate: [ AuthGuard ] },
  { path: 'table/new', component: TableFormComponent, canActivate: [ AuthGuard ] },
  { path: 'table/:id/edit', component: TableFormComponent, canActivate: [ AuthGuard ] },

  // Product components routes.
  { path: 'products', component: ProductListComponent, canActivate: [ AuthGuard ] },
  { path: 'product/new', component: ProductFormComponent, canActivate: [ AuthGuard ] },
  { path: 'product/:id/edit', component: ProductFormComponent, canActivate: [ AuthGuard ] },

  // Payment methods component routes.
  { path: 'payment-methods', component: PaymentMethodListComponent, canActivate: [ AuthGuard ] },
  { path: 'payment-method/new', component: PaymentMethodFormComponent, canActivate: [ AuthGuard ] },
  { path: 'payment-method/:id/edit', component: PaymentMethodFormComponent, canActivate: [ AuthGuard ] },

  // Order components routes.
  { path: 'orders', component: OrderListComponent, canActivate: [ AuthGuard ] },
  { path: 'order/new', component: OrderFormComponent, canActivate: [ AuthGuard ] },
  { path: 'order/:id/view', component: OrderViewComponent, canActivate: [ AuthGuard ] },
  { path: 'order/:id/complete', component: OrderCompleteComponent, canActivate: [ AuthGuard ] }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    SidebarComponent,
    TableListComponent,
    TableFormComponent,
    ProductFormComponent,
    ProductListComponent,
    PaymentMethodListComponent,
    PaymentMethodFormComponent,
    OrderListComponent,
    SummaryPipe,
    OrderFormComponent,
    OrderViewComponent,
    OrderCompleteComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AuthService,
    TableService,
    ProductService,
    OrderService,
    OrderProductService,
    PaymentMethodService,
    PaymentService,
    StatisticsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  entryComponents: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
