import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/_models/order';
import { OrderService } from 'src/app/_services/order.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { CreateOrderComponent } from '../create-order/create-order.component';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html'
})
export class ListOrderComponent implements OnInit {
  title: string = 'ORDERS';


  constructor(private orderService: OrderService, private dialog: MatDialog) { }

  ngOnInit() {
    this.orderService.getOrders();
  }

  openRegistrationOrderDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.panelClass = 'customized-dialog';
    dialogConfig.width = '25%';

    this.dialog.open(CreateOrderComponent, dialogConfig);
  }

  onDelete(order: Order): void {
    if (confirm('Are you sure to delete ' + order.orderName + '?')) {
      this.orderService.deleteOrder(order).subscribe(
        res => {
          const index = this.orderService.orders.indexOf(order);
          this.orderService.orders.splice(index, 1);
        },
        err => {
          console.log(err);
          alert(err);
        }
      );
    }
  }

}
