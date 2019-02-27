import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  title: string = 'REGISTER';
  form: FormGroup;
  submitted: boolean = false;
  
  constructor(private fb: FormBuilder, private service: AuthService, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: [null, [Validators.required, Validators.maxLength(50)]],
      lastName: [null, [Validators.required, Validators.maxLength(25)]],
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

    this.service.register(form.value).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/login']);
      },
      err => {
        console.log(err);
      }
    );
  }

  reset(form: NgForm): void {
    form.reset();
  }

}
