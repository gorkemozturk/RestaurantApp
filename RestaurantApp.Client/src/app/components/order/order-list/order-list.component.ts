import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/_models/order';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/_services/order.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html'
})
export class OrderListComponent implements OnInit {
  title: string = 'Orders';
  orders: Order[] = [];

  page = 1;
  pageSize = 5;
  collectionSize = this.orders.length;

  constructor(private service: OrderService, private toastr: ToastrService, private authService: AuthService) { }

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
          this.toastr.error('An error has been occurred during the process.', 'Error');
        }
      );
    }
  }

}
