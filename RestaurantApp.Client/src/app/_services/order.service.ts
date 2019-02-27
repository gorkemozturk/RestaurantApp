import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../_models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly url = 'https://localhost:44323/api/orders/';

  orders: Order[] = [];

  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http.get<any>(this.url).subscribe(res => this.orders = res);
  }

  postOrder(order: Order) {
    return this.http.post<any>(this.url, order);
  }

  deleteOrder(order: Order) {
    return this.http.delete<any>(this.url + order.id);
  }
}
