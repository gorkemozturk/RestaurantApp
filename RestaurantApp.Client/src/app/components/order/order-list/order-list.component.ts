import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/_models/order';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html'
})
export class OrderListComponent implements OnInit {
  title: string = 'Orders';
  orders: Order[] = [];

  constructor(private service: OrderService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.getOrders().subscribe(res => this.orders = res);
  }

  onDelete(order: Order): void {
    if (confirm('Are you sure you want to delete ' + order.orderName + '?')) {
      this.service.deleteOrder(order).subscribe(
        res => {
          const index = this.orders.indexOf(order);
          this.orders.splice(index, 1);
          this.toastr.warning('You have been deleted ' + order.orderName + ' successfully.', 'Successfully');
        },
        err => {
          console.log(err);
          alert(err);
        }
      );
    }
  }

}
