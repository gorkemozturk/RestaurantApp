import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/_models/order';
import { OrderService } from 'src/app/_services/order.service';
import { OrderProduct } from 'src/app/_models/order-product';
import { OrderProductService } from 'src/app/_services/order-product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html'
})
export class KitchenComponent implements OnInit {
  title: string = 'Kitchen';
  products: OrderProduct[] = [];

  page = 1;
  pageSize = 5;
  collectionSize = this.products.length;

  constructor(private orderProductService: OrderProductService, private toastr: ToastrService) { }

  ngOnInit() {
    this.orderProductService.getRecentOrderProducts().subscribe(res => this.products = res);
  }

  confirmProduct(product: OrderProduct): void {
    if (confirm('Are you sure you want to update this product?')) {
      this.orderProductService.putOrderProduct(product).subscribe(
        res => {
          product.isDone = !product.isDone;
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
