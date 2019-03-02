import { Component, OnInit } from '@angular/core';
import { PaymentMethod } from 'src/app/_models/payment-method';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { PaymentMethodService } from 'src/app/_services/payment-method.service';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html'
})
export class PaymentMethodComponent implements OnInit {
  title: string = 'PAYMENT METHODS';
  form: FormGroup;
  submitted: boolean = false;
  methods: PaymentMethod[] = [];
  
  constructor(private service: PaymentMethodService, private fb: FormBuilder) { }

  ngOnInit() {
    this.service.getPaymentMethods().subscribe(res => this.methods = res);

    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.maxLength(45)]]
    });
  }

  get field() { return this.form.controls; }

  onSubmit(form: NgForm): void {
    this.submitted = true;

    if (this.form.invalid) { return; }

    this.service.postPaymentMethod(form.value).subscribe(
      (res: PaymentMethod) => {
        this.methods.push(res);
        this.reset(form);
      },
      err => {
        console.log(err);
        alert(err);
      }
    );
  }

  onDelete(method: PaymentMethod): void {
    if (confirm('Are you sure to delete ' + method.name + '?')) {
      this.service.deletePaymentMethod(method).subscribe(
        res => {
          const index = this.methods.indexOf(method);
          this.methods.splice(index, 1);
        },
        err => {
          console.log(err);
          alert(err);
        }
      );
    }
  }

  reset(form: NgForm) {
    form.reset();
    this.submitted = false;
  }

}
