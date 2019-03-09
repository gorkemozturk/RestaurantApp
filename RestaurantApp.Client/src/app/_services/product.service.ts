import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../_models/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly url = 'https://localhost:44323/api/products/';

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<any>(this.url).pipe(map(result => result));
  }

  getProduct(id: any) {
    return this.http.get<any>(this.url + id).pipe(map(result => result));
  }

  putProduct(id: any, product: Product) {
    return this.http.put<any>(this.url + id, product).pipe(map(result => result));
  }

  postProduct(product: Product) {
    return this.http.post<any>(this.url, product).pipe(map(result => result));
  }

  deleteProduct(product: Product) {
    return this.http.delete<any>(this.url + product.id).pipe(map(result => result));
  }

  getProductUsage(id: number) {
    return this.http.get<any>(this.url + id + '/usage').pipe(map(result => result));
  }
}
