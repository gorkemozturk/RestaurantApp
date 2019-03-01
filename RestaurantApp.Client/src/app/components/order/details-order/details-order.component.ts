import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/_models/product';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderProductService } from 'src/app/_services/order-product.service';
import { OrderService } from 'src/app/_services/order.service';
import { OrderProduct } from 'src/app/_models/order-product';
import { Order } from 'src/app/_models/order';

@Component({
  selector: 'app-details-order',
  templateUrl: './details-order.component.html'
})
export class DetailsOrderComponent implements OnInit {
  products: Product[] = [];
  form: FormGroup;
  order: Order;
  orderID: any;
  

  constructor(private orderService: OrderService, private orderProductService: OrderProductService, private productService: ProductService, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    this.orderID = this.route.snapshot.paramMap.get('id');
    this.productService.getProducts().subscribe(res => this.products = res);
    this.orderProductService.getOrderProducts(this.orderID);
    this.orderService.getTotal(this.orderID);
    this.orderService.getOrder(this.orderID).subscribe(res => this.order = res);
  }

  onSubmit(product: any): void {
    this.orderProductService.postOrderProduct(this.orderID, product).subscribe(
      res => {
        this.orderProductService.getOrderProducts(this.orderID);
        this.orderService.getTotal(this.orderID);
      },
      err => {
        console.log(err);
      }
    );
  }

  onDelete(product: OrderProduct): void {
    this.orderProductService.deleteOrderProduct(product).subscribe(
      res => {
        this.orderProductService.getOrderProducts(this.orderID);
        this.orderService.getTotal(this.orderID);
      },
      err => {
        console.log(err);
      }
    );
  }

}
