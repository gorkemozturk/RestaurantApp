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

  getTable(id: any) {
    return this.http.get<any>(this.url + id);
  }

  postTable(table: Table) {
    return this.http.post<any>(this.url, table);
  }

  putTable(id: number, table: Table) {
    return this.http.put<any>(this.url + id, table);
  }

  deleteTable(table: Table) {
    return this.http.delete<any>(this.url + table.id);
  }
  
  getTableUsage(id: number) {
    return this.http.get<any>(this.url + id + '/usage');
  }
}
