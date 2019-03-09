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

        Chart.defaults.global.defaultFontFamily = 'Montserrat';

        this.chart = new Chart('table-status', {
          type: 'pie',
          data: {
            datasets: [{
              data: [
                avaliable,
                unavaliable
              ],
              backgroundColor: [
                '#5BC0DE',
                '#F0AD4E'
              ],
            }],
            labels: [
              'Avaliable',
              'Unavaliable'
            ]
          },
          options: {
            responsive: true
          }
        })
      }
    );
  }

}
