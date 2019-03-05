import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly url = 'https://localhost:44323/api/products/';

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<any>(this.url);
  }

  getProduct(id: any) {
    return this.http.get<any>(this.url + id);
  }

  putProduct(id: any, product: Product) {
    return this.http.put<any>(this.url + id, product);
  }

  postProduct(product: Product) {
    return this.http.post<any>(this.url, product);
  }

  deleteProduct(product: Product) {
    return this.http.delete<any>(this.url + product.id);
  }

  getProductUsage(id: number) {
    return this.http.get<any>(this.url + id + '/usage');
  }
}
