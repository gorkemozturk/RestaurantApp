import { Component, OnInit } from '@angular/core';
import { Table } from 'src/app/_models/table';
import { TableService } from 'src/app/_services/table.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html'
})
export class TableListComponent implements OnInit {
  title: string = 'Tables';
  tables: Table[] = [];
  usage: boolean = false;

  constructor(private service: TableService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.getTables().subscribe(res => this.tables = res);
  }

  onDelete(table: Table): void {
    this.service.getTableUsage(table.id).subscribe(
      res => {
        this.usage = res;
        
        if (this.usage === true) {
          this.toastr.error('You cannot delete ' +  table.tableName + ' since it is using on an order.', 'Error');
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
              alert(err);
            }
          );
        }
      }
    );
  }

}
