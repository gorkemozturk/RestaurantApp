import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { OrderProductService } from 'src/app/_services/order-product.service';

@Component({
  selector: 'app-recent-product',
  templateUrl: './recent-product.component.html'
})
export class RecentProductComponent implements OnInit {
  chart = [];

  constructor(private orderProductService: OrderProductService) { }

  ngOnInit() {
    this.orderProductService.getRecentOrderProducts().subscribe(
      res => {
        let products = [];
        let quantities = [];
        let colors = [];

        var arrayProduct = res, grouped = [];
    
        arrayProduct.forEach(function (i) {
        if (!this[i.product.productName]) {
          this[i.product.productName] = { name: i.product.productName, quantity: 0 };
          grouped.push(this[i.product.productName]);
        }
          this[i.product.productName].quantity += i.quantity;
        }, Object.create(null));
    

        for (let item in grouped) {
          products.push(grouped[item].name);
          quantities.push(grouped[item].quantity);
          colors.push(this.getRandomColor());
        }

        this.chart = new Chart('recent-product', {
          type: 'doughnut',
          data: {
            datasets: [{
              data: quantities,
              backgroundColor: colors,
              borderColor: colors,
              borderWidth: 1
            }],
            labels: products
          },
          options: {
            responsive: true
          }
        });
      }
    );
  }

  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
}
