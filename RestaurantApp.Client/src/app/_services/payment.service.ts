import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Payment } from '../_models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private readonly url = 'https://localhost:44323/api/payments/';

  constructor(private http: HttpClient) { }

  getPayments() {
    return this.http.get<any>(this.url);
  }

  getPayment(id: number) {
    return this.http.get<any>(this.url + id);
  }

  postPayment(total: number, payment: Payment) {
    return this.http.post<any>(this.url + total, payment);
  }

  deletePayment(payment: Payment) {
    return this.http.delete<any>(this.url + payment.id);
  }
}
