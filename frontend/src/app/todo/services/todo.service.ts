import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
import { HttpClient,  HttpHeaders  } from '@angular/common/http';
import { ApiUrlConstant } from 'src/app/core/constant/api-url.constant';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
public headersData: any
public userId : any;
  constructor(private http: HttpClient) {}

  getTasks(data: any): Rx.Observable<any> {
    console.log(this.headersData,"headers data");
    
    return this.http.post(ApiUrlConstant.GETTASKS, data,{ headers: new HttpHeaders().set('Authorization', localStorage.getItem('token'))});
  }

  getTaskById(data: any): Rx.Observable<any> {
    return this.http.get(ApiUrlConstant.GETTASKBYID,{ headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')), params:data});
  }

  deleteTask(data: any): Rx.Observable<any> {
    return this.http.put(ApiUrlConstant.DELETETASK, data,{  headers: new HttpHeaders().set('Authorization', localStorage.getItem('token'))});
  }
  
  addTask(data:any):Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.ADDTASK, data,{  headers: new HttpHeaders().set('Authorization', localStorage.getItem('token'))});
  }
  
  editTask(data: any): Rx.Observable<any> {
    return this.http.put(ApiUrlConstant.EDITTASK, data, { headers: new HttpHeaders().set('Authorization', localStorage.getItem('token'))});
  }
  exportTask(data:any):Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.EXPORTTASK, data,{ headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')), responseType: "blob" });
  }

}
