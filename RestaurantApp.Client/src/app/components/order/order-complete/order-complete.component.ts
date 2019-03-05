import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { PaymentService } from 'src/app/_services/payment.service';
import { PaymentMethodService } from 'src/app/_services/payment-method.service';
import { PaymentMethod } from 'src/app/_models/payment-method';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { OrderService } from 'src/app/_services/order.service';
import { OrderProductService } from 'src/app/_services/order-product.service';
import { OrderProduct } from 'src/app/_models/order-product';

@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete.component.html'
})
export class OrderCompleteComponent implements OnInit {
  form: FormGroup;
  methods: PaymentMethod[] = [];
  orderProducts: OrderProduct[] = [];
  submitted: boolean = false;
  id: any = {};
  order: any = {};
  title: string = 'Complete Order';
  status: boolean = false;

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService, 
    private methodService: PaymentMethodService,
    private orderService: OrderService,
    private orderProductService: OrderProductService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.methodService.getPaymentMethods().subscribe(res => this.methods = res);

    this.form = this.fb.group({
      orderID: [null],
      total: [null],
      paymentMethodID: [null, Validators.required]
    });

    this.orderService.getOrder(this.id).pipe(take(1)).subscribe(
      res => {
        this.order = res;
        this.form.setValue({
          orderID: this.order.id,
          total: this.order.total,
          paymentMethodID: null
        });
      }
    );

    this.orderService.getOrderStatus(this.id).pipe(take(1)).subscribe(res => this.status = res);

    this.orderProductService.getOrderProducts(this.id).pipe(take(1)).subscribe(res => this.orderProducts = res);
  }

  get field() { return this.form.controls; }

  onSubmit(form: NgForm): void {
    this.submitted = true;

    if (this.form.invalid) { return; }

    this.paymentService.postPayment(form.value).subscribe(
      res => {
        this.router.navigate(['/order/' + this.id + '/view']);
      },
      err => {
        console.log(err);
        alert(err);
      }
    );
  }

  reset(form: NgForm): void {
    form.reset();
    this.submitted = false;
  }

}
