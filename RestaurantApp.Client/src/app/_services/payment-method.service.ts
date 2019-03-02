import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaymentMethod } from '../_models/payment-method';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {
  private readonly url = 'https://localhost:44323/api/paymentmethods/';

  constructor(private http: HttpClient) { }

  getPaymentMethods() {
    return this.http.get<any>(this.url);
  }

  postPaymentMethod(method: PaymentMethod) {
    return this.http.post<any>(this.url, method);
  }

  deletePaymentMethod(method: PaymentMethod) {
    return this.http.delete<any>(this.url + method.id);
  }
}
