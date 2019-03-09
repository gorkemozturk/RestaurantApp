import { Injectable } from '@angular/core';
import { Table } from '../_models/table';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private readonly url = 'https://localhost:44323/api/tables/';

  constructor(private http: HttpClient) { }

  getTables() {
    return this.http.get<any>(this.url).pipe(map(result => result));
  }

  getAvaliableTables() {
    return this.http.get<any>(this.url + 'avaliable').pipe(map(result => result));
  }

  getTable(id: any) {
    return this.http.get<any>(this.url + id).pipe(map(result => result));
  }

  postTable(table: Table) {
    return this.http.post<any>(this.url, table).pipe(map(result => result));
  }

  putTable(id: number, table: Table) {
    return this.http.put<any>(this.url + id, table).pipe(map(result => result));
  }

  deleteTable(table: Table) {
    return this.http.delete<any>(this.url + table.id).pipe(map(result => result));
  }
  
  getTableUsage(id: number) {
    return this.http.get<any>(this.url + id + '/usage').pipe(map(result => result));
  }
}
