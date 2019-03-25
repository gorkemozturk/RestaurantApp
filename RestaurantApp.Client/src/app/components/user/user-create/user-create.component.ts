import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html'
})

export class UserCreateComponent implements OnInit {
  title: string = 'Create a New User';
  form: FormGroup;
  submitted: boolean = false;
  
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: [null, [Validators.required, Validators.maxLength(50)]],
      lastName: [null, [Validators.required, Validators.maxLength(25)]],
      email: [null, [Validators.required, Validators.maxLength(25), Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  get field() { return this.form.controls; }

  onSubmit(form: NgForm): void {
    this.submitted = true;

    if (this.form.invalid) { return; }

    this.userService.postUser(form.value).subscribe(
      res => {
        this.router.navigate(['/users']);
      },
      err => {
        console.log(err);
      }
    );
  }

  randomPass (length, addUpper, addSymbols, addNums) {
      var lower = "abcdefghijklmnopqrstuvwxyz";
      var upper = addUpper ? lower.toUpperCase() : "";
      var nums = addNums ? "0123456789" : "";
      var symbols = addSymbols ? "!#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~" : "";

      var all = lower + upper + nums + symbols;
      while (true) {
          var pass = "";
          for (var i=0; i<length; i++) {
              pass += all[Math.random() * all.length | 0];
          }

          if (!/[a-z]/.test(pass)) continue;
          if (addUpper && !/[A-Z]/.test(pass)) continue;
          if (addSymbols && !/\W/.test(pass)) continue;
          if (addNums && !/\d/.test(pass)) continue;

          return pass;
      }
  }

  generatePassword() {
    this.form.controls['password'].setValue(this.randomPass(6, true, true, true));
  }

  reset(form: NgForm): void {
    form.reset();
  }

}
