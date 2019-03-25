import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

import { ToastrModule } from 'ngx-toastr';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
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
import { LoginGuard } from './_guards/login.guard';
import { PaymentComponent } from './components/payment/payment.component';
import { UserService } from './_services/user.service';
import { TableStatusComponent } from './components/home/table-status/table-status.component';
import { RecentPaymentComponent } from './components/home/recent-payment/recent-payment.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { OrderProductStatusComponent } from './components/order-product-status/order-product-status.component';
import { KitchenComponent } from './components/kitchen/kitchen.component';
import { OrderOverviewComponent } from './components/order-overview/order-overview.component';
import { ServiceComponent } from './components/service/service.component';
import { RecentProductComponent } from './components/home/recent-product/recent-product.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { UserOverviewComponent } from './components/user-overview/user-overview.component';
import { OrderPipe } from './_helpers/order.pipe';
import { ProductPipe } from './_helpers/product.pipe';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Route[] = [
  { path: '', component: HomeComponent, canActivate: [ AuthGuard ] },

  // Authantications routes.
  { path: 'login', component: LoginComponent, canActivate: [ LoginGuard ] },
  { path: 'register', component: RegisterComponent, canActivate: [ LoginGuard ] },

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
  { path: 'order/:id/complete', component: OrderCompleteComponent, canActivate: [ AuthGuard ] },

  // Payment component route.
  { path: 'payments', component: PaymentComponent, canActivate: [ AuthGuard ] },

  // Kitchen component route.
  { path: 'kitchen', component: KitchenComponent, canActivate: [ AuthGuard ] },

  // Service component route.
  { path: 'services', component: ServiceComponent, canActivate: [ AuthGuard ] },

  // User components routes.
  { path: 'users', component: UserListComponent, canActivate: [ AuthGuard ] },
  { path: 'user/new', component: UserCreateComponent, canActivate: [ AuthGuard ] },

  // 404 Not Found Component.
  { path: '**', component: NotFoundComponent, canActivate: [ AuthGuard ] }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
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
    OrderCompleteComponent,
    PaymentComponent,
    TableStatusComponent,
    RecentPaymentComponent,
    UserListComponent,
    OrderProductStatusComponent,
    KitchenComponent,
    OrderOverviewComponent,
    ServiceComponent,
    RecentProductComponent,
    LoginComponent,
    RegisterComponent,
    UserCreateComponent,
    UserOverviewComponent,
    OrderPipe,
    ProductPipe,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    NgbPaginationModule
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
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    OrderOverviewComponent,
    UserOverviewComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
