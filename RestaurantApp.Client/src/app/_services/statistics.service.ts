import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private readonly url = 'https://localhost:44323/api/statistics/';

  constructor(private http: HttpClient) { }

  getDailyGains() {
    return this.http.get<any>(this.url + 'daily-gains').pipe(map(result => result));
  }

  getWeeklyGains() {
    return this.http.get<any>(this.url + 'weekly-gains').pipe(map(result => result));
  }

  getMonthlyGains() {
    return this.http.get<any>(this.url + 'monthly-gains').pipe(map(result => result));
  }
}
