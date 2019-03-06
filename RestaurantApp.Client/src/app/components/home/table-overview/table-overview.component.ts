import { Component, OnInit } from '@angular/core';
import { Table } from 'src/app/_models/table';
import { TableService } from 'src/app/_services/table.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderOverviewComponent } from '../order-overview/order-overview.component';

@Component({
  selector: 'app-table-overview',
  templateUrl: './table-overview.component.html'
})
export class TableOverviewComponent implements OnInit {
  tables: Table[] = [];
  
  constructor(private tableService: TableService, private dialog: MatDialog) { }

  ngOnInit() {
    this.tableService.getTables().subscribe(res => this.tables = res);
  }

  setClass(table: Table) {
    let cl = {
      'bg-info text-white': !table.isAvailable
    }

    return cl;
  }

  openOrderDialog(id: number): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.panelClass = 'customized-dialog';
    dialogConfig.width = '20%';
    dialogConfig.data = { id };

    this.dialog.open(OrderOverviewComponent, dialogConfig);
  }

}
