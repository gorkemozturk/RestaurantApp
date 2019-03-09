import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  title: string = 'Login the Application';
  form: FormGroup;
  submitted: boolean = false;
  
  constructor(private fb: FormBuilder, private service: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  get field() { return this.form.controls; }

  onSubmit(form: NgForm): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.service.login(form.value).subscribe(
      res => {
        localStorage.setItem('token', res);
        this.router.navigate(['/']);
      },
      err => {
        this.toastr.error('An error has been occurred during login process.', 'Error');
      }
    );
  }

}
