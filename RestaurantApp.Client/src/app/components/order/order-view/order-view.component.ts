import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/_services/order.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { OrderProductService } from 'src/app/_services/order-product.service';
import { OrderProduct } from 'src/app/_models/order-product';
import { Product } from 'src/app/_models/product';
import { ProductService } from 'src/app/_services/product.service';
import { PaymentService } from 'src/app/_services/payment.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html'
})
export class OrderViewComponent implements OnInit {
  id: any = null;
  order: any = {};
  products: Product[] = [];
  orderProducts: OrderProduct[] = [];
  payment: any = {};
  total: number = 0;
  status: boolean = false;

  constructor(
    private orderService: OrderService, 
    private orderProductService: OrderProductService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private paymentService: PaymentService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    // Get current order.
    this.orderService.getOrder(this.id).pipe(take(1)).subscribe(
        res => { 
          this.order = res;
          if (this.order.isPaid) {
            this.paymentService.getPayment(this.id).pipe(take(1)).subscribe(res => this.payment = res);
          }
        }
      );

    // Get all products that belongs to current order.
    this.orderProductService.getOrderProducts(this.id).pipe(take(1)).subscribe(res => this.orderProducts = res);

    // Get all products to insert to current order.
    this.productService.getProducts().subscribe(res => this.products = res);

    // Get total order that belongs to current order.
    this.orderService.getTotal(this.id).pipe(take(1)).subscribe(res => this.total = res);

    // Get status that belongs to current order.
    this.orderService.getOrderStatus(this.id).pipe(take(1)).subscribe(res => this.status = res);
  }

  onSubmit(product: any): void {
    this.orderProductService.postOrderProduct(this.id, product).subscribe(
      res => {
        this.orderProductService.getOrderProducts(this.id).subscribe(res => this.orderProducts = res);
        this.orderService.getTotal(this.id).pipe(take(1)).subscribe(res => this.total = res);
        this.orderService.getOrderStatus(this.id).pipe(take(1)).subscribe(res => this.status = res);
      },
      err => {
        console.log(err);
        alert(err);
      }
    );
  }

  onDelete(product: OrderProduct): void {
    this.orderProductService.deleteOrderProduct(product).subscribe(
      res => {
        const index = this.orderProducts.indexOf(product);
        this.orderProducts.splice(index, 1);
        this.orderService.getTotal(this.id).pipe(take(1)).subscribe(res => this.total = res);
        this.orderService.getOrderStatus(this.id).pipe(take(1)).subscribe(res => this.status = res);
      },
      err => {
        console.log(err);
        alert(err);
      }
    );
  }

  confirmProduct(product: OrderProduct): void {
    if (confirm('Are you sure you want to set this product as ready?')) {
      this.orderProductService.putOrderProduct(product).subscribe(
        res => {
          product.isDone = !product.isDone;
          this.orderService.getOrderStatus(this.id).pipe(take(1)).subscribe(res => this.status = res);
        },
        err => {
          console.log(err);
          alert(err);
        }
      );
    }
  }

}