import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  title: string = 'REGISTER';
  form: FormGroup;
  submitted: boolean = false;
  users: User[] = [];
  
  constructor(private fb: FormBuilder, private userService: UserService, private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(res => this.users = res);

    this.form = this.fb.group({
      firstName: [null, [Validators.required, Validators.maxLength(50)]],
      lastName: [null, [Validators.required, Validators.maxLength(25)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      confirmPassword: ['', Validators.required]
    }, 
    {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get field() { return this.form.controls; }

  onSubmit(form: NgForm): void {
    this.submitted = true;

    if (this.form.invalid) { return; }

    this.authService.register(form.value).subscribe(
      res => {
        this.router.navigate(['/login']);
      },
      err => {
        console.log(err);
        this.toastr.error('An error has been occurred during the process.', 'Error');
      }
    );
  }

  reset(form: NgForm): void {
    form.reset();
    this.submitted = false;
  }

}