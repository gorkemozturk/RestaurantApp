import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/_services/table.service';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-table-form',
  templateUrl: './table-form.component.html'
})
export class TableFormComponent implements OnInit {
  title: string = '';
  form: FormGroup;
  submitted: boolean = false;
  table: any = {};
  id: any = {}
  
  constructor(
    private service: TableService, 
    private fb: FormBuilder, 
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = this.fb.group({
      tableName: [null, [Validators.required, Validators.maxLength(10)]],
      isAvailable: [true]
    });

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.title = 'Edit Table';
      this.service.getTable(this.id).pipe(take(1)).subscribe(
        res => {
          this.table = res;

          this.form.addControl('id', new FormControl(this.id));

          this.form.setValue({
            id: this.id,
            tableName: this.table.tableName,
            isAvailable: this.table.isAvailable
          });
        }
      );
    } else {
      this.title = 'Create a New Table';
    }
  }

  get field() { return this.form.controls; }

  onSubmit(form: NgForm): void {
    this.submitted = true;

    if (this.form.invalid) { return; }

    if (this.id) {
      this.service.putTable(this.id, form.value).subscribe(
        res => {
          this.router.navigate(['/tables'])
        },
        err => {
          console.log(err);
          alert(err);
        }
      );
    } else {
      this.service.postTable(form.value).subscribe(
        res => {
          this.router.navigate(['/tables'])
        },
        err => {
          console.log(err);
          alert(err);
        }
      );
    }
  }

  reset(form: NgForm): void {
    if (this.id) {
      form.setValue({
        id: this.id,
        tableName: null,
        isAvailable: true
      });
    } else {
      form.reset({
        tableName: null,
        isAvailable: true
      });
    }

    this.submitted = false;
  }

}
