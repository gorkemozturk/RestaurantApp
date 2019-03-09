import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ApplicationUser } from 'src/app/_models/application-user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  title: string = 'Users';
  users: ApplicationUser[] = [];

  page = 1;
  pageSize = 5;
  collectionSize = this.users.length;

  constructor(private authService: AuthService, private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(res => this.users = res);
  }
  
}
