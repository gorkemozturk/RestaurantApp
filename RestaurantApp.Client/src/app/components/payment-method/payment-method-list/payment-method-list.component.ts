import { Component, OnInit } from '@angular/core';
import { PaymentMethod } from 'src/app/_models/payment-method';
import { PaymentMethodService } from 'src/app/_services/payment-method.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-method-list',
  templateUrl: './payment-method-list.component.html'
})
export class PaymentMethodListComponent implements OnInit {
  title: string = 'Payment Methods';
  methods: PaymentMethod[] = [];
  usage: boolean = false;

  constructor(private service: PaymentMethodService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.getPaymentMethods().subscribe(res => this.methods = res);
  }

  onDelete(method: PaymentMethod): void {
    this.service.getPaymentMethodUsage(method.id).subscribe(
      res => {
        this.usage = res;
        
        if (this.usage === true) {
          this.toastr.error('You cannot delete ' +  method.name + ' since it is using on an order.', 'Error');
        } else {
          if (!(confirm('Are you sure you want to delete ' + method.name + '?'))) { return; }

          this.service.deletePaymentMethod(method).subscribe(
            res => {
              const index = this.methods.indexOf(method);
              this.methods.splice(index, 1);
              this.toastr.warning('You have been deleted ' + method.name + ' successfully.', 'Successfully');
            },
            err => {
              console.log(err);
              alert(err);
            }
          );
        }
      }
    );
  }

}