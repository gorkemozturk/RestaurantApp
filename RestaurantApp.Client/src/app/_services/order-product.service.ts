import { Injectable } from '@angular/core';
import { OrderProduct } from '../_models/order-product';
import { HttpClient } from '@angular/common/http';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class OrderProductService {
  private readonly url = 'https://localhost:44323/api/orderproducts/';

  orderProducts: OrderProduct[] = [];

  constructor(private http: HttpClient) { }

  getOrderProducts(id: number) {
    return this.http.get<any>(this.url + id).subscribe(res => this.orderProducts = res);
  }

  postOrderProduct(orderID: number, product: any) {
    return this.http.post<any>(this.url + 'order/' + orderID + '/product/' + product.id, product);
  }

  deleteOrderProduct(product: OrderProduct) {
    return this.http.delete<any>(this.url + product.id);
  }
}
