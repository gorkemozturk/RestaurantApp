import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public service: AuthService, public router: Router) {}
  
  canActivate(): boolean {
    if (!this.service.isAuthanticated) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
  
}
