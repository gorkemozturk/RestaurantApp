import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentMethodService } from 'src/app/_services/payment-method.service';

@Component({
  selector: 'app-payment-method-form',
  templateUrl: './payment-method-form.component.html'
})
export class PaymentMethodFormComponent implements OnInit {
  title: string = '';
  form: FormGroup;
  submitted: boolean = false;
  method: any = {};
  id: any = {}
  
  constructor(
    private service: PaymentMethodService, 
    private fb: FormBuilder, 
    private router: Router,
    private route: ActivatedRoute) { }

    ngOnInit() {
      this.form = this.fb.group({
        name: [null, [Validators.required, Validators.maxLength(45)]]
      });
  
      this.id = this.route.snapshot.paramMap.get('id');
  
      if (this.id) {
        this.title = 'Edit Payment Method';
        this.service.getPaymentMethod(this.id).pipe(take(1)).subscribe(
          res => {
            this.method = res;
  
            this.form.addControl('id', new FormControl(this.id));
  
            this.form.setValue({
              id: this.id,
              name: this.method.name
            });
          }
        );
      } else {
        this.title = 'Create a New Payment Method';
      }
    }

    get field() { return this.form.controls; }

    onSubmit(form: NgForm): void {
      this.submitted = true;
  
      if (this.form.invalid) { return; }
  
      if (this.id) {
        this.service.putPaymentMethod(this.id, form.value).subscribe(
          res => {
            this.router.navigate(['/payment-methods'])
          },
          err => {
            console.log(err);
            alert(err);
          }
        );
      } else {
        this.service.postPaymentMethod(form.value).subscribe(
          res => {
            this.router.navigate(['/payment-methods'])
          },
          err => {
            console.log(err);
            alert(err);
          }
        );
      }
    }
  
    reset(form: NgForm): void {
      if (this.id) {
        form.setValue({
          id: this.id,
          name: null
        });
      } else {
        form.reset({
          name: null
        });
      }
  
      this.submitted = false;
    }

}
