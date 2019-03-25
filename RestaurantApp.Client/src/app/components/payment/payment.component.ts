import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/_services/payment.service';
import { ToastrService } from 'ngx-toastr';
import { Payment } from 'src/app/_models/payment';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html'
})
export class PaymentComponent implements OnInit {
  title: string = 'Payments';
  payments: Payment[] = [];

  page = 1;
  pageSize = 5;
  collectionSize = this.payments.length;

  constructor(private paymentService: PaymentService, private toastr: ToastrService, private authService: AuthService) { }

  ngOnInit() {
    this.paymentService.getPayments().subscribe(res => this.payments = res);
  }

  onDelete(payment: Payment, event: any): void {
    event.stopPropagation();

    if (!confirm('Are you sure you want to delete this payment?')) { return; }

    this.paymentService.deletePayment(payment).subscribe(
      res => {
        const index = this.payments.indexOf(payment);
        this.payments.splice(index, 1);
        this.toastr.warning('You have deleted this payment successfully.', 'Successfuly');
      },
      err => {
        console.log(err);
        this.toastr.error('An error has been occurred during the process.', 'Error');
      }
    );
  }

}
