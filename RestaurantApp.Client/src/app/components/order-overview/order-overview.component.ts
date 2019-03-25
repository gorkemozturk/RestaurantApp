import { Component, OnInit, Inject } from '@angular/core';
import { TableService } from 'src/app/_services/table.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from 'src/app/_services/order.service';
import { OrderProductService } from 'src/app/_services/order-product.service';
import { take } from 'rxjs/operators';
import { OrderProduct } from 'src/app/_models/order-product';

@Component({
  selector: 'app-order-overview',
  templateUrl: './order-overview.component.html'
})
export class OrderOverviewComponent implements OnInit {
  order: any = {};
  products: OrderProduct[] = [];
  result: boolean = false;
  table: any = {};
  
  constructor(@Inject(MAT_DIALOG_DATA) public data, private orderService: OrderService, private orderProductService: OrderProductService) { }

  ngOnInit() {
    this.orderService.getOrderByTable(this.data.id).pipe(take(1)).subscribe(
      res => {
        this.order = res;
        this.orderProductService.getOrderProducts(this.order.id).pipe(take(1)).subscribe(res => this.products = res);
      }
    );
  }

  get sumProduct () {
    let sum = 0;
    for (let product in this.products) {
      sum += this.products[product].quantity;
    }

    return sum;
  }

}
