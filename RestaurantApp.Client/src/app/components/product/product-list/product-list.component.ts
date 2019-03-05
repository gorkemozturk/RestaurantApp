import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_models/product';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  title: string = 'Products';
  products: Product[] = [];
  usage: boolean = false;

  constructor(private toastr: ToastrService, private service: ProductService) { }

  ngOnInit() {
    this.service.getProducts().subscribe(res => this.products = res);
  }

  onDelete(product: Product): void {
    this.service.getProductUsage(product.id).subscribe(
      res => {
        this.usage = res;
        if (this.usage === true) {
          this.toastr.error('You cannot delete ' +  product.productName + ' since it is using on an order.', 'Error');
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
                alert(err);
              }
            );
          }
        }
      }
    );
  }

}
