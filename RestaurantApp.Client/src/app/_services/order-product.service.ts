import { Injectable } from '@angular/core';
import { OrderProduct } from '../_models/order-product';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderProductService {
  private readonly url = 'https://localhost:44323/api/orderproducts/';

  constructor(private http: HttpClient) { }

  getOrderProducts(id: number) {
    return this.http.get<any>(this.url + id).pipe(map(result => result));
  }

  getRecentOrderProducts() {
    return this.http.get<any>(this.url + 'recent').pipe(map(result => result));
  }

  postOrderProduct(orderID: number, product: any) {
    return this.http.post<any>(this.url + 'order/' + orderID + '/product/' + product.id, product).pipe(map(result => result));
  }

  deleteOrderProduct(product: OrderProduct) {
    return this.http.delete<any>(this.url + product.id).pipe(map(result => result));
  }

  putOrderProduct(product: OrderProduct) {
    return this.http.put<any>(this.url + product.id, product).pipe(map(result => result));
  }
}
