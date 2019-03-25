import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/_services/payment.service';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-recent-payment',
  templateUrl: './recent-payment.component.html'
})
export class RecentPaymentComponent implements OnInit {
  chart = [];

  constructor(private service: PaymentService) { }

  ngOnInit() {
    this.service.getRecentPayments().subscribe(
      res => {
        let dates = [];
        let incomes = [];

        for (let item in res) {
          let date = new Date(res[item].createdAt);
          dates.push(date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
          incomes.push(res[item].total.toFixed(2));
        }

        Chart.defaults.global.defaultFontFamily = 'Roboto';

        this.chart = new Chart('weekly-income', {
          type: 'bar',
          data: {
            labels: dates,
            datasets: [
              {
                data: incomes,
                backgroundColor: 'rgb(66, 139, 202, 0.5)',
                borderColor: 'rgb(66, 139, 202)',
                label: 'Payment',
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            legend: {
              display: false,
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }]
            }
          }
        })
      }
    );
  }

}
