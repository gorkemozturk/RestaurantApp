import { Injectable } from '@angular/core';
import { Table } from '../_models/table';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private readonly url = 'https://localhost:44323/api/tables/';

  constructor(private http: HttpClient) { }

  getTables() {
    return this.http.get<any>(this.url);
  }

  getAvaliableTables() {
    return this.http.get<any>(this.url + 'avaliable');
  }

  postTable(table: Table) {
    return this.http.post<any>(this.url, table);
  }

  deleteTable(table: Table) {
    return this.http.delete<any>(this.url + table.id);
  }
}
