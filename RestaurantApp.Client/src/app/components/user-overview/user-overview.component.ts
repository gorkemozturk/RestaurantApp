import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/_services/user.service';
import { take } from 'rxjs/operators';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html'
})
export class UserOverviewComponent implements OnInit {
  user: any = {};
  expanded: boolean = false;
  resetExpanded: boolean = false;
  form: FormGroup;
  resetForm: FormGroup;
  submitted: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data, private userService: UserService, private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.userService.getUser(this.data.id).pipe(take(1)).subscribe(res => this.user = res);
  }

  openForm() {
    this.expanded = !this.expanded;

    this.form = this.fb.group({
      id: this.data.id,
      firstName: [this.user.firstName, [Validators.required, Validators.maxLength(50)]],
      lastName: [this.user.lastName, [Validators.required, Validators.maxLength(25)]],
      phoneNumber: [this.user.phoneNumber, [Validators.maxLength(25)]],
      city: [this.user.city, [Validators.maxLength(25)]],
      province: [this.user.province, [Validators.maxLength(25)]],
      address: [this.user.address, [Validators.maxLength(150)]],
      salary: [this.user.salary, [Validators.pattern('^[0-9]{1,9}$')]]
    });
  }

  openResetForm() {
    this.resetExpanded = !this.resetExpanded;

    this.resetForm = this.fb.group({
      id: this.data.id,
      currentPassword: [null, Validators.required],
      newPassword: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    }, 
    {
      validator: MustMatch('newPassword', 'confirmPassword')
    });
  }

  onSubmit(form: NgForm): void {
    this.submitted = true;

    if (this.form.invalid) { return; }

    this.userService.putUser(this.data.id, form.value).subscribe(
      res => {
        this.submitted = false;
        this.expanded = !this.expanded;
        this.userService.getUser(this.data.id).pipe(take(1)).subscribe(res => this.user = res);
      },
      err => {
        console.log(err);
      }
    );
  }

  onSubmitPassword(form: NgForm): void {
    this.submitted = true;

    if (this.resetForm.invalid) { return; }

    this.userService.putUserPassword(this.data.id, form.value).subscribe(
      res => {
        this.submitted = false;
        this.resetExpanded = !this.resetExpanded;
        this.userService.getUser(this.data.id).pipe(take(1)).subscribe(res => this.user = res);
      },
      err => {
        console.log(err);
      }
    );
  }
  
  get field() { return this.form.controls; }
  get passwordField() { return this.resetForm.controls; }

  cancel() {
    if (this.expanded === true)  this.expanded = !this.expanded;
    else this.resetExpanded = !this.resetExpanded;

    this.submitted = false;
  }

}
