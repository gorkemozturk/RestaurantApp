import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private readonly url = 'https://localhost:44323/api/statistics/';

  constructor(private http: HttpClient) { }

  getDailyGains() {
    return this.http.get<any>(this.url + 'dailygains');
  }

  getWeeklyGains() {
    return this.http.get<any>(this.url + 'weeklygains');
  }

  getMonthlyGains() {
    return this.http.get<any>(this.url + 'monthlygains');
  }
}
