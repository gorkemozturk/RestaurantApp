import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { ProductService } from 'src/app/_services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {
  title: string = '';
  form: FormGroup;
  submitted: boolean = false;
  product: any = {};
  id: any = {}
  
  constructor(
    private service: ProductService, 
    private fb: FormBuilder, 
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = this.fb.group({
      productName: [null, [Validators.required, Validators.maxLength(35)]],
      price: [null, [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      tax: [null, [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]]
    });

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.title = 'Edit Product';
      this.service.getProduct(this.id).pipe(take(1)).subscribe(
        res => {
          this.product = res;

          this.form.addControl('id', new FormControl(this.id));

          this.form.setValue({
            id: this.id,
            productName: this.product.productName,
            price: this.product.price,
            tax: this.product.tax,
          });
        }
      );
    } else {
      this.title = 'Create a New Product';
    }
  }

  get field() { return this.form.controls; }

  onSubmit(form: NgForm): void {
    this.submitted = true;

    if (this.form.invalid) { return; }

    if (this.id) {
      this.service.putProduct(this.id, form.value).subscribe(
        res => {
          this.router.navigate(['/products'])
        },
        err => {
          console.log(err);
          alert(err);
        }
      );
    } else {
      this.service.postProduct(form.value).subscribe(
        res => {
          this.router.navigate(['/products'])
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
        productName: null,
        price: null,
        tax: null,
      });
    } else {
      form.reset({
        productName: null,
        price: null,
        tax: null,
      });
    }

    this.submitted = false;
  }
}
