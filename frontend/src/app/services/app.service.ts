import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiUrlConstant } from 'src/app/core/constant/api-url.constant';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  public headersData: any;
  constructor(private http: HttpClient) {

  let headers = new HttpHeaders();
  this.headersData = headers.set('Authorization', localStorage.getItem('token'));
  
   }

  registerUser(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.REGISTERUSER, data);
  }

  getUserById(data: any): Rx.Observable<any> {
    
    return this.http.post(ApiUrlConstant.GETUSERBYID, data,{ headers: this.headersData });
  }

  login(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.LOGIN, data);
  }

}
