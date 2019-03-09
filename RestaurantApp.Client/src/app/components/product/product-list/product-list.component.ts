import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_models/product';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/_services/product.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  title: string = 'Products';
  products: Product[] = [];
  usage: boolean = false;

  page = 1;
  pageSize = 5;
  collectionSize = this.products.length;

  constructor(private toastr: ToastrService, private service: ProductService, private authService: AuthService) { }

  ngOnInit() {
    this.service.getProducts().subscribe(res => this.products = res);
  }

  onDelete(product: Product): void {
    this.service.getProductUsage(product.id).subscribe(
      res => {
        this.usage = res;
        if (this.usage === true) {
          this.toastr.warning('You cannot delete ' +  product.productName + ' since it is using on an order.', 'Warning');
        } else {
          if (confirm('Are you sure you want to delete ' + product.productName + '?')) {
            this.service.deleteProduct(product).subscribe(
              res => {
                const index = this.products.indexOf(product);
                this.products.splice(index, 1);
                this.toastr.warning('You have been deleted ' + product.productName + ' successfully.', 'Successfully');
              },
              err => {
                console.log(err);
                this.toastr.error('An error has been occurred during the process.', 'Error');
              }
            );
          }
        }
      },
      err => {
        console.log(err);
        this.toastr.error('An error has been occurred during the process.', 'Error');
      }
    );
  }

}
