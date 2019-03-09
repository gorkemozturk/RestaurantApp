import { Component, OnInit, Input } from '@angular/core';
import { OrderProduct } from 'src/app/_models/order-product';

@Component({
  selector: 'app-order-product-status',
  templateUrl: './order-product-status.component.html'
})
export class OrderProductStatusComponent implements OnInit {
  @Input() product: OrderProduct;
  
  constructor() { }

  ngOnInit() {
  }

}
