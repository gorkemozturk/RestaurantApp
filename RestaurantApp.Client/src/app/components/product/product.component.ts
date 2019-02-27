import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Product } from 'src/app/_models/product';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {
  title: string = 'PRODUCTS';
  products: Product[] = [];
  form: FormGroup;
  submitted: boolean = false;
  
  constructor(private service: ProductService, private fb: FormBuilder) { }

  ngOnInit() {
    this.service.getProducts().subscribe(res => this.products = res);

    this.form = this.fb.group({
      productName: [null, [Validators.required, Validators.maxLength(35)]],
      price: [null, [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      tax: [null, [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]]
    });
  }

  get field() { return this.form.controls; }

  reset(form: NgForm): void {
    form.reset();
  }

  onSubmit(form: NgForm): void {
    this.submitted = true;

    if (this.form.invalid)  return;

    this.service.postProduct(form.value).subscribe(
      (res: Product) => {
        this.products.push(res);
        form.reset();
        this.submitted = false;
      },
      err => {
        console.log(err);
        alert(err);
      }
    );
  }

  onDelete(product: Product): void {
    if (confirm('Are you sure to delete ' + product.productName + '?')) {
      this.service.deleteProduct(product).subscribe(
        res => {
          const index = this.products.indexOf(product);
          this.products.splice(index, 1);
        },
        err => {
          console.log(err);
          alert(err);
        }
      );
    }
  }

}
