import { Component, OnInit } from '@angular/core';
import { Table } from 'src/app/_models/table';
import { TableService } from 'src/app/_services/table.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderOverviewComponent } from '../../order-overview/order-overview.component';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html'
})
export class TableListComponent implements OnInit {
  title: string = 'Tables';
  tables: Table[] = [];
  usage: boolean = false;

  page = 1;
  pageSize = 20;
  collectionSize = this.tables.length;

  constructor(private service: TableService, private toastr: ToastrService, private authService: AuthService, private dialog: MatDialog) { }

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

  setClass(table: Table) {
    let cl;
    if (!table.isAvailable) { cl = 'bg-primary text-white'; } 
    else { cl = 'bg-white'; }

    return cl;
  }
  
  openOrderOverview(id: number): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.panelClass = 'customized-dialog';
    dialogConfig.data = { id };

    this.dialog.open(OrderOverviewComponent, dialogConfig);
  }

}
