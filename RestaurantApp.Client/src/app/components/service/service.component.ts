import { Component, OnInit } from '@angular/core';
import { OrderProduct } from 'src/app/_models/order-product';
import { OrderProductService } from 'src/app/_services/order-product.service';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html'
})
export class ServiceComponent implements OnInit {
  title: string = 'Services';
  products: OrderProduct[] = [];

  page = 1;
  pageSize = 15;
  collectionSize = this.products.length;

  constructor(private orderProductService: OrderProductService, private toastr: ToastrService) { }

  ngOnInit() {
    this.orderProductService.getRecentOrderProducts().pipe(map(projects => projects.filter(res => res.isDone === true))).subscribe(res => this.products = res);
  }

  
  confirmProduct(product: OrderProduct): void {
    if (confirm('Are you sure you want to update this product?')) {
      this.orderProductService.putOrderProduct(product).subscribe(
        res => {
          product.isServed = true;
          this.toastr.success('You have updated this product successfully.', 'Successfully');
        },
        err => {
          console.log(err);
          this.toastr.error('An error has been occurred during the process.', 'Error');
        }
      );
    }
  }

}
