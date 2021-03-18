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
  constructor(private http: HttpClient) { 
    this.userId = localStorage.getItem('_id');
  
  let headers = new HttpHeaders();
  this.headersData = headers.set('Authorization', localStorage.getItem('token'));
  
  }
  public dateRangeConfig: any = {
    start: moment().format('DD/MM/YYYY'),
    end: moment().format('DD/MM/YYYY'),
    autoUpdateInput: true,
    format: 'DD/MM/YYYY',
    locale: {
      format: 'DD/MM/YYYY',
      applyLabel: 'Appliquer',
      cancelLabel: 'Retour',
      fromLabel: 'Du',
      toLabel: 'Au',
      weekLabel: 'W',
      customRangeLabel: 'Personnalisé',
      daysOfWeek: ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"],
      monthNames: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
      firstDay: 1
    },
    alwaysShowCalendars: false,
  };

  getTasks(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.GETTASKS, data,{ headers: this.headersData});
  }

  getTaskById(data: any): Rx.Observable<any> {
    return this.http.get(ApiUrlConstant.GETTASKBYID,{headers: this.headersData, params:data});
  }

  deleteTask(data: any): Rx.Observable<any> {
    return this.http.put(ApiUrlConstant.DELETETASK, data,{ headers: this.headersData});
  }
  
  addTask(data:any):Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.ADDTASK, data,{ headers: this.headersData});
  }
  
  editTask(data: any): Rx.Observable<any> {
    return this.http.put(ApiUrlConstant.EDITTASK, data, { headers: this.headersData});
  }
  exportTask(data:any):Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.EXPORTTASK, data,{ headers: this.headersData});
  }

  dateRangeOptions = () => {
  
      return this.dateRangeConfig;
    
  }
}
