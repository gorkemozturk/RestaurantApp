import { Component, OnInit } from '@angular/core';
import { Table } from 'src/app/_models/table';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { TableService } from 'src/app/_services/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {
  title: string = 'TABLES';
  tables: Table[] = [];
  form: FormGroup;
  submitted: boolean = false;

  constructor(private service: TableService, private fb: FormBuilder) { }

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

    if (this.form.invalid) {
      return;
    }

    this.service.postTable(form.value).subscribe(
      res => {
        this.tables.push(res);
        form.setValue({
          tableName: null,
          isAvailable: true
        });
        this.submitted = false;
      },
      err => {
        console.log(err);
        alert(err);
      }
    );
  }

  onDelete(table: Table): void {
    if (confirm('Are you sure to delete ' + table.tableName + '?')) {
      this.service.deleteTable(table).subscribe(
        res => {
          const index = this.tables.indexOf(table);
          this.tables.splice(index, 1);
        },
        err => {
          console.log(err);
          alert(err);
        }
      );
    }
  }

  reset(form: NgForm): void {
    form.reset({
      tableName: null,
      isAvailable: true
    });
  }

}
