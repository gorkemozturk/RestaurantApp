import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/_models/product';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderProductService } from 'src/app/_services/order-product.service';
import { OrderService } from 'src/app/_services/order.service';
import { OrderProduct } from 'src/app/_models/order-product';
import { PaymentService } from 'src/app/_services/payment.service';
import { PaymentMethodService } from 'src/app/_services/payment-method.service';
import { PaymentMethod } from 'src/app/_models/payment-method';

@Component({
  selector: 'app-details-order',
  templateUrl: './details-order.component.html'
})
export class DetailsOrderComponent implements OnInit {
  products: Product[] = [];
  payment: any = {};
  methods: PaymentMethod[] = [];
  form: FormGroup;
  order: any = {};
  orderID: any;
  ready: boolean = false;
  total: number = 0;
  submitted: boolean = false;

  constructor(private methodService: PaymentMethodService, private paymentService: PaymentService, private orderService: OrderService, private orderProductService: OrderProductService, private productService: ProductService, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    this.orderID = this.route.snapshot.paramMap.get('id');
    this.productService.getProducts().subscribe(res => this.products = res);
    this.orderProductService.getOrderProducts(this.orderID);
    this.orderService.getTotal(this.orderID).subscribe(res => this.total = res);
    this.orderService.getOrderStatus(this.orderID).subscribe(res => this.ready = res);
    this.orderService.getOrder(this.orderID).subscribe(
      res => {
        this.order = res;
        if (this.order.isPaid === true) {
          this.paymentService.getPayment(this.orderID).subscribe(res => this.payment = res);
        }
      });
    this.methodService.getPaymentMethods().subscribe(res => this.methods = res);
    this.form = this.fb.group({
      orderID: [this.orderID],
      paymentMethodID: [null, Validators.required]
    });
  }

  get field() { return this.form.controls; }

  onSubmit(product: any): void {
    this.orderProductService.postOrderProduct(this.orderID, product).subscribe(
      res => {
        this.orderProductService.getOrderProducts(this.orderID);
        this.orderService.getTotal(this.orderID).subscribe(res => this.total = res);
        this.orderService.getOrderStatus(this.orderID).subscribe(res => this.ready = res);
      },
      err => {
        console.log(err);
      }
    );
  }

  onDelete(product: OrderProduct): void {
    this.orderProductService.deleteOrderProduct(product).subscribe(
      res => {
        this.orderProductService.getOrderProducts(this.orderID);
        this.orderService.getTotal(this.orderID).subscribe(res => this.total = res);
        this.orderService.getOrderStatus(this.orderID).subscribe(res => this.ready = res);
      },
      err => {
        console.log(err);
      }
    );
  }

  confirmProduct(product: OrderProduct): void {
    if (confirm('Are you sure you want to set this product as ready?')) {
      this.orderProductService.putOrderProduct(product).subscribe(
        res => {
          product.isDone = !product.isDone;
          this.orderService.getOrderStatus(this.orderID).subscribe(res => this.ready = res);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  completeOrder(total: number, form: NgForm) {
    this.submitted = true;

    if (this.form.invalid) { return; }

    if (this.ready === true) {
      this.paymentService.postPayment(total, form.value).subscribe(
        res => {
          this.order.isPaid = true;
          this.paymentService.getPayment(this.orderID).subscribe(res => this.payment = res);
        },
        err => {
          console.log(err);
        }
      );
    }
    else {
      alert('Product(s) that belongs to ' + this.order.orderName + ' have to get ready to complete order.');
    }
  }

  setClass(product: OrderProduct) {
    let cl = {
      'table-info': product.isDone && !this.order.isPaid
    }

    return cl;
  }

}
