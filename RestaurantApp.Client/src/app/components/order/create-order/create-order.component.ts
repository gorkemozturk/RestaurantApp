import { Component, OnInit } from '@angular/core';
import { Table } from 'src/app/_models/table';
import { OrderService } from 'src/app/_services/order.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { TableService } from 'src/app/_services/table.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html'
})
export class CreateOrderComponent implements OnInit {
  title: string = 'CREATE A NEW ORDER';
  tables: Table[];
  form: FormGroup;
  submitted: boolean = false;
  
  constructor(private orderService: OrderService, private fb: FormBuilder, private tableService: TableService) { }

  ngOnInit() {
    this.tableService.getAvaliableTables().subscribe(res => this.tables = res);
    
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
        form.reset();
        this.submitted = false;
        this.orderService.getOrders();
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
