import { Component, OnInit } from '@angular/core';
import { Table } from 'src/app/_models/table';
import { TableService } from 'src/app/_services/table.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html'
})
export class TableListComponent implements OnInit {
  title: string = 'Tables';
  tables: Table[] = [];
  usage: boolean = false;

  page = 1;
  pageSize = 5;
  collectionSize = this.tables.length;

  constructor(private service: TableService, private toastr: ToastrService, private authService: AuthService) { }

  ngOnInit() {
    this.service.getTables().subscribe(res => this.tables = res);
  }

  onDelete(table: Table): void {
    this.service.getTableUsage(table.id).subscribe(
      res => {
        this.usage = res;
        
        if (this.usage === true) {
          this.toastr.warning('You cannot delete ' +  table.tableName + ' since it is using on an order.', 'Warning');
        } else {
          if (!(confirm('Are you sure you want to delete ' + table.tableName + '?'))) { return; }

          this.service.deleteTable(table).subscribe(
            res => {
              const index = this.tables.indexOf(table);
              this.tables.splice(index, 1);
              this.toastr.warning('You have been deleted ' + table.tableName + ' successfully.', 'Successfully');
            },
            err => {
              console.log(err);
              this.toastr.error('An error has been occurred during the process.', 'Error');
            }
          );
        }
      },
      err => {
        console.log(err);
        this.toastr.error('An error has been occurred during the process.', 'Error');
      }
    );
  }

}
