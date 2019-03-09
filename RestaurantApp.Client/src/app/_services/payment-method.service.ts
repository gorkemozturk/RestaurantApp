import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaymentMethod } from '../_models/payment-method';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {
  private readonly url = 'https://localhost:44323/api/paymentmethods/';

  constructor(private http: HttpClient) { }

  getPaymentMethods() {
    return this.http.get<any>(this.url).pipe(map(result => result));
  }

  getPaymentMethod(id: any) {
    return this.http.get<any>(this.url + id).pipe(map(result => result));
  }

  postPaymentMethod(method: PaymentMethod) {
    return this.http.post<any>(this.url, method).pipe(map(result => result));
  }

  putPaymentMethod(id: any, method: PaymentMethod) {
    return this.http.put<any>(this.url + id, method).pipe(map(result => result));
  }

  deletePaymentMethod(method: PaymentMethod) {
    return this.http.delete<any>(this.url + method.id).pipe(map(result => result));
  }

  getPaymentMethodUsage(id: number) {
    return this.http.get<any>(this.url + id + '/usage').pipe(map(result => result));
  }
}
