import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import decode from 'jwt-decode';
import { AuthService } from './auth.service';
// import { WINDOW } from './../services/window.provider';
import * as _ from 'underscore';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(public auth: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('token');
    // decode the token to get its payload
    const tokenPayload = token?decode(token):null;
    console.log(tokenPayload, "tokenPayload")
    // || 
    // tokenPayload.user_type !== expectedRole
  
    if (
      !this.auth.isAuthenticated()) {
      
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
