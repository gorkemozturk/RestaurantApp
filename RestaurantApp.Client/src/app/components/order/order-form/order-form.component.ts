import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { OrderService } from 'src/app/_services/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Table } from 'src/app/_models/table';
import { TableService } from 'src/app/_services/table.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html'
})
export class OrderFormComponent implements OnInit {
  title: string = 'Create a New Order';
  form: FormGroup;
  submitted: boolean = false;
  tables: Table[] = [];
  id: any = {};
  table: any = {};
  
  constructor(
    private orderService: OrderService, 
    private tableService: TableService, 
    private fb: FormBuilder, 
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.queryParamMap.get('table');

    this.tableService.getAvaliableTables().subscribe(res => this.tables = res);

    if (this.id) {
      this.tableService.getTable(this.id).subscribe(
        res => {
          this.table = res;
          this.form.setValue({
            orderName: this.table.tableName + "'s Order at " + new Date().toLocaleDateString() + ' - ' + new Date().toLocaleTimeString(),
            tableID: this.id
          });
        }
      );
    }

    this.form = this.fb.group({
      orderName: [null, [Validators.required, Validators.maxLength(50)]],
      tableID: [null, Validators.required]
    });
  }

  get field() { return this.form.controls; }

  reset(form: NgForm): void {
    form.reset();
    this.submitted = false;
  }

  onSubmit(form: NgForm) {
    this.submitted = true;

    if (this.form.invalid)  return;
    
    this.orderService.postOrder(form.value).subscribe(
      res => {
        this.router.navigate(['/order/' + res.id + '/view']);
      },
      err => {
        console.log(err);
        alert(err);
      }
    );
  }

  setName(event): void {
    this.form.setValue({
      orderName: this.tables[event.selectedIndex].tableName + "'s Order at " + new Date().toLocaleDateString() + ' - ' + new Date().toLocaleTimeString(),
      tableID: event.value
    })
  }

}
