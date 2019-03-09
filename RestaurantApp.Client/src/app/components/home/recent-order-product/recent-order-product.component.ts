import { Component, OnInit } from '@angular/core';
import { OrderProductService } from 'src/app/_services/order-product.service';
import { OrderProduct } from 'src/app/_models/order-product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recent-order-product',
  templateUrl: './recent-order-product.component.html'
})
export class RecentOrderProductComponent implements OnInit {
  products: OrderProduct[] = [];

  constructor(private service: OrderProductService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.getRecentOrderProducts().subscribe(res => this.products = res);
  }

  confirmProduct(product: OrderProduct): void {
    if(product.isServed === true) { return; }

    if (confirm('Are you sure you want to update this product?')) {
      this.service.putOrderProduct(product).subscribe(
        res => {
          if (product.isDone === false) { product.isDone = !product.isDone; }
          else { product.isServed = !product.isServed }
          this.toastr.success('You have updated this product successfully.', 'Successfully');
        },
        err => {
          console.log(err);
          this.toastr.error('An error has been occurred during the process.', 'Error');
        }
      );
    }
  }

}
