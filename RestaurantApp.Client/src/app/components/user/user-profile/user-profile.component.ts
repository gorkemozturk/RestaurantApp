import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  id: any;
  title: string = 'User Profile';
  isExpanded: boolean = true;
  form: FormGroup;
  submitted: boolean = false;

  constructor(private userService: UserService, private route: ActivatedRoute, private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    
    // Get user which belongs to the id.
    this.userService.getUser(this.id).pipe(take(1)).subscribe(
      res => {
        this.user = res;
      }
    );

    // Update Form.
    this.form = this.fb.group({
      id: [null],
      phoneNumber: [null, [Validators.maxLength(25)]],
      city: [null, [Validators.maxLength(25)]],
      province: [null, [Validators.maxLength(25)]],
      address: [null, [Validators.maxLength(150)]]
    });
  }

  get field() { return this.form.controls; }

  openForm() {
    this.isExpanded = !this.isExpanded;

    this.form.setValue({
      id: this.id,
      phoneNumber: this.user.phoneNumber,
      city: this.user.city,
      province: this.user.province,
      address: this.user.address
    });
  }

  onSubmit(form: NgForm): void {
    this.submitted = true;

    if (this.form.invalid) { return; }

    this.userService.putUser(this.id, form.value).subscribe(
      res => {
        this.isExpanded = !this.isExpanded;
        this.userService.getUser(this.id).pipe(take(1)).subscribe(res => this.user = res);
      },
      err => {
        console.log(err);
        alert(err);
      }
    );
  }

  cancel() { this.isExpanded = !this.isExpanded; }
}
