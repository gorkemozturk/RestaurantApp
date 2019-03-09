import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Payment } from '../_models/payment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private readonly url = 'https://localhost:44323/api/payments/';

  constructor(private http: HttpClient) { }

  getPayments() {
    return this.http.get<any>(this.url).pipe(map(result => result));
  }

  getRecentPayments() {
    return this.http.get<any>(this.url + 'recent').pipe(map(result => result));
  }

  getPayment(id: number) {
    return this.http.get<any>(this.url + id).pipe(map(result => result));
  }

  postPayment(payment: Payment) {
    return this.http.post<any>(this.url, payment).pipe(map(result => result));
  }

  deletePayment(payment: Payment) {
    return this.http.delete<any>(this.url + payment.id).pipe(map(result => result));
  }
}
