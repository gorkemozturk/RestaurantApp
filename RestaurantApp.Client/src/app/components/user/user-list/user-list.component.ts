import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ApplicationUser } from 'src/app/_models/application-user';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserOverviewComponent } from '../../user-overview/user-overview.component';
import { User } from 'src/app/_models/user';

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

  constructor(private authService: AuthService, private userService: UserService, private toastr: ToastrService, private dialog: MatDialog) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(res => this.users = res);
  }

  openUserOverview(id: number): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.panelClass = 'customized-dialog';
    dialogConfig.data = { id };

    this.dialog.open(UserOverviewComponent, dialogConfig);
  }

  lockoutUser(user: User) {
    if (!(confirm('Are you sure you want to passivize ' + user.firstName + ' ' + user.lastName + ' from the application?'))) return false;

    this.userService.lockoutUser(user).subscribe(
      res => {
        user.lockoutEnd = new Date("2099-12-12");
        this.toastr.warning(user.firstName + ' ' + user.lastName + ' has been banned successfully.', 'Successfully');
      },
      err => {
        console.log(err);
      }
    );
  }

  unlockUser(user: User) {
    if (!(confirm('Are you sure you want to activate ' + user.firstName + ' ' + user.lastName + ' from the application?'))) return false;

    this.userService.unlockUser(user).subscribe(
      res => {
        user.lockoutEnd = null;
        this.toastr.success(user.firstName + ' ' + user.lastName + "'s ban has been revoked successfully.", 'Successfully');
      },
      err => {
        console.log(err);
      }
    );
  }
  
}
