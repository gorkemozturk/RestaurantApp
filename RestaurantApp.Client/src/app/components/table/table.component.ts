import { Component, OnInit } from '@angular/core';
import { Table } from 'src/app/_models/table';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { TableService } from 'src/app/_services/table.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {
  title: string = 'TABLES';
  tables: Table[] = [];
  form: FormGroup;
  submitted: boolean = false;
  usage: boolean = false;

  constructor(private service: TableService, private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.getTables().subscribe(res => this.tables = res);
    
    this.form = this.fb.group({
      tableName: [null, [Validators.required, Validators.maxLength(10)]],
      isAvailable: [true]
    });
  }

  get field() { return this.form.controls; }

  onSubmit(form: NgForm): void {
    this.submitted = true;

    if (this.form.invalid) { return; }

    this.service.postTable(form.value).subscribe(
      res => {
        this.tables.push(res);
        this.reset(form);
        this.submitted = false;
        this.toastr.success('You have been inserted the table successfully.', 'Successfully');
      },
      err => {
        console.log(err);
        alert(err);
      }
    );
  }

  onDelete(table: Table): void {
    this.service.getTableUsage(table.id).subscribe(
      res => {
        this.usage = res;
        if (this.usage === true) {
          this.toastr.error('You cannot delete ' +  table.tableName + ' since it is using on an order.', 'Error');
        } else {
          if (confirm('Are you sure to delete ' + table.tableName + '?')) {
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
      }
    );
  }

  reset(form: NgForm): void {
    form.reset({
      tableName: null,
      isAvailable: true
    });

    this.submitted = false;
  }

}
