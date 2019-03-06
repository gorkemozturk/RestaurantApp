import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/_services/order.service';
import { Order } from 'src/app/_models/order';

@Component({
  selector: 'app-active-order',
  templateUrl: './active-order.component.html'
})
export class ActiveOrderComponent implements OnInit {
  orders: Order[] = [];

  constructor(private service: OrderService) { }

  ngOnInit() {
    this.service.getACtiveOrders().subscribe(res => this.orders = res);
  }

}
