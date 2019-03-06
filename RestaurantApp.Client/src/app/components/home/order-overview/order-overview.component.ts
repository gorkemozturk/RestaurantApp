import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from 'src/app/_services/order.service';
import { take } from 'rxjs/operators';
import { OrderProductService } from 'src/app/_services/order-product.service';
import { OrderProduct } from 'src/app/_models/order-product';
import { TableService } from 'src/app/_services/table.service';

@Component({
  selector: 'app-order-overview',
  templateUrl: './order-overview.component.html'
})
export class OrderOverviewComponent implements OnInit {
  order: any = {};
  products: OrderProduct[] = [];
  result: boolean = false;
  table: any = {};

  constructor(@Inject(MAT_DIALOG_DATA) public data, private service: OrderService, private orderProductService: OrderProductService, private tableService: TableService) { }

  ngOnInit() {
    this.service.getOrderByTable(this.data.id).pipe(take(1)).subscribe(
      res => {
        if (res) { 
          this.order = res;
          this.orderProductService.getOrderProducts(this.order.id).pipe(take(1)).subscribe(res => this.products = res);
          this.result = true;
        } else {
          this.result = false;
          this.tableService.getTable(this.data.id).subscribe(res => this.table = res);
        }
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
