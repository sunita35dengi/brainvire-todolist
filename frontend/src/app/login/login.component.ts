import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { genralConfig } from 'src/app/core/constant/genral-config.constant';
import { AppService } from '../services/app.service';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { WebStorage } from 'ngx-webstorage/lib/core/interfaces/webStorage';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loader:boolean = false;
  loginForm: FormGroup;
  constructor(private appService:AppService,private _formBuilder: FormBuilder, public router: Router,
    private toastr: ToastrService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }
  login(){
    if (this.loginForm.valid ) {
      this.loader = true;
      const formModel = this.prepareSave();
      let data = this.loginForm.value
      this.appService.login(data).subscribe((res: any) => {
        let resp = res;
        this.loader = false;
        if(Object.keys(resp.resultData).length > 0){
          let response = resp.resultData;
          console.log(response, 'resultDataresponse')
          // localstorage
          let fullName = response.first_name + ' '+response.last_name;
          localStorage.setItem("fullName", fullName);
          localStorage.setItem('token', response.access_token);
          localStorage.setItem('_id',response.iduser);
          localStorage.setItem('email',response.email);
          let url = 'todo';
          this.router.navigate([url]);
        }else{
          this.toastr.error(res.message);
        }
      })
    }
  }


  private prepareSave(): any {
    let inputData = new FormData();
    inputData.append('email', this.loginForm.get('email').value);
    inputData.append('password', this.loginForm.get('password').value);
    return inputData;
}

}
