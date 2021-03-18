import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as _ from 'underscore';
const jwtHelper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    console.log(token, jwtHelper.isTokenExpired(token), "auth service" )
    if (!_.isUndefined(token) || !_.isNull(token) || !_.isEmpty(token) ) {
      console.log(token, "auth service");
      
       return !jwtHelper.isTokenExpired(token)
     
    }
    return false;
  }
}
