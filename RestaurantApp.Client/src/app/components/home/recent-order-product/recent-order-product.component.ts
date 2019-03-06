import { Component, OnInit } from '@angular/core';
import { OrderProductService } from 'src/app/_services/order-product.service';
import { OrderProduct } from 'src/app/_models/order-product';

@Component({
  selector: 'app-recent-order-product',
  templateUrl: './recent-order-product.component.html'
})
export class RecentOrderProductComponent implements OnInit {
  products: OrderProduct[] = [];

  constructor(private service: OrderProductService) { }

  ngOnInit() {
    this.service.getRecentOrderProducts().subscribe(res => this.products = res);
  }

  confirmProduct(product: OrderProduct): void {
    if(product.isDone === true) { return; }

    if (confirm('Are you sure you want to set this product as ready?')) {
      this.service.putOrderProduct(product).subscribe(
        res => {
          product.isDone = !product.isDone;
        },
        err => {
          console.log(err);
          alert(err);
        }
      );
    }
  }

}
