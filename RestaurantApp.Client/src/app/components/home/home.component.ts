import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/_services/statistics.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  dailyGains: number = 0;
  weeklyGains: number = 0;
  monthlyGains: number = 0;

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit() {
    this.statisticsService.getDailyGains().subscribe(res => this.dailyGains = res);
    this.statisticsService.getWeeklyGains().subscribe(res => this.weeklyGains = res);
    this.statisticsService.getMonthlyGains().subscribe(res => this.monthlyGains = res);
  }

}
