import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/_services/table.service';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-table-status',
  templateUrl: './table-status.component.html'
})
export class TableStatusComponent implements OnInit {
  chart = [];

  constructor(private service: TableService) { }

  ngOnInit() {
    this.service.getTables().subscribe(
      res => {
        let avaliable = 0;
        let unavaliable = 0;
        
        for (let item in res) {
          if (res[item].isAvailable) { avaliable++; } 
          else { unavaliable++; }
        }

        Chart.defaults.global.defaultFontFamily = 'Roboto';

        this.chart = new Chart('table-status', {
          type: 'doughnut',
          data: {
            datasets: [{
              data: [avaliable,unavaliable],
              backgroundColor: ['rgb(66, 139, 202, 0.5)', 'rgb(217, 83, 79, 0.5)'],
              borderColor: ['rgb(66, 139, 202)', 'rgb(217, 83, 79)'],
              borderWidth: 1
            }],
            labels: ['Avaliable Table','Unavaliable Table']
          },
          options: {
            responsive: true
          }
        })
      }
    );
  }
}
