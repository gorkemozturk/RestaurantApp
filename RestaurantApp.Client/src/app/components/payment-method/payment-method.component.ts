import { Component, OnInit } from '@angular/core';
import { PaymentMethod } from 'src/app/_models/payment-method';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { PaymentMethodService } from 'src/app/_services/payment-method.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html'
})
export class PaymentMethodComponent implements OnInit {
  title: string = 'PAYMENT METHODS';
  form: FormGroup;
  submitted: boolean = false;
  methods: PaymentMethod[] = [];
  usage: boolean = false;
  
  constructor(private service: PaymentMethodService, private fb: FormBuilder, private toastr: ToastrService) { }

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
        this.toastr.success('You have been inserted the product successfully.', 'Successfully');
      },
      err => {
        console.log(err);
        alert(err);
      }
    );
  }

  onDelete(method: PaymentMethod): void {
    this.service.getPaymentMethodUsage(method.id).subscribe(
      res => {
        this.usage = res;
        if (this.usage === true) {
          this.toastr.error('You cannot delete ' +  method.name + ' since it is using on a payment.', 'Error');
        } else {
          if (confirm('Are you sure to delete ' + method.name + '?')) {
            this.service.deletePaymentMethod(method).subscribe(
              res => {
                const index = this.methods.indexOf(method);
                this.methods.splice(index, 1);
                this.toastr.warning('You have been deleted ' + method.name + ' successfully.', 'Successfully');
              },
              err => {
                console.log(err);
                alert(err);
              }
            );
          }
        }
      }
    );
  }

  reset(form: NgForm) {
    form.reset();
    this.submitted = false;
  }

}
