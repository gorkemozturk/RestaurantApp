import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/_services/statistics.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  title: string = 'DASHBOARD';

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit() {
  }

}
