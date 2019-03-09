import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../_models/order';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly url = 'https://localhost:44323/api/orders/';

  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http.get<any>(this.url).pipe(map(result => result));
  }

  getACtiveOrders() {
    return this.http.get<any>(this.url + 'active').pipe(map(result => result));
  }

  getOrder(id: any) {
    return this.http.get<any>(this.url + id).pipe(map(result => result));
  }

  getOrderByTable(id: any) {
    return this.http.get<any>(this.url + 'table/' + id).pipe(map(result => result));
  }

  postOrder(order: Order) {
    return this.http.post<any>(this.url, order).pipe(map(result => result));
  }

  deleteOrder(order: Order) {
    return this.http.delete<any>(this.url + order.id).pipe(map(result => result));
  }

  getTotal(id: number) {
    return this.http.get<any>(this.url + id + '/total').pipe(map(result => result));
  }

  getOrderStatus(id: number) {
    return this.http.get<any>(this.url + id + '/status').pipe(map(result => result));
  }
}
