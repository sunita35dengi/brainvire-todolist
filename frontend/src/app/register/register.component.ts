import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { genralConfig } from 'src/app/core/constant/genral-config.constant';
import { AppService } from '../services/app.service';
import { ActivatedRoute,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  loader:boolean=false;
  constructor(private appService:AppService, 
    private _formBuilder: FormBuilder, public router: Router, private toastr: ToastrService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.registrationForm = this._formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(genralConfig.pattern.NAMEMAXLENGTH), Validators.minLength(genralConfig.pattern.NAMEMINLENGTH)]],
      lastName: ['', [Validators.required, Validators.maxLength(genralConfig.pattern.NAMEMAXLENGTH), Validators.minLength(genralConfig.pattern.NAMEMINLENGTH)]],
      email:['', [Validators.required, Validators.pattern(genralConfig.pattern.EMAIL)]],
      password: ['', [Validators.required, Validators.pattern(genralConfig.pattern.PASSWORD)]],
      confpassword:  ['', [Validators.required, Validators.pattern(genralConfig.pattern.PASSWORD)]],
      
  },{validator: this.passwordMatchValidator});
  }
  passwordMatchValidator(formGroup: FormGroup) {  
    return formGroup.controls['password'].value === formGroup.controls['confpassword'].value ? null : {'mismatch': true};
  }
  registerUser(){
    this.loader = false;
    console.log(this.registrationForm.value, "here", this.registrationForm.valid)
    if (this.registrationForm.valid ) {
       this.loader = true;
       const formModel = this.prepareSave(this.registrationForm.value);
       this.appService.registerUser(formModel).subscribe((res: any) => {
         if(res.resultData == true){
           let response = res.resultData;
           let url = 'login';
           this.router.navigate([url]);
       
         }else{
           this.loader = false;
           this.toastr.error(res.message)
         }
       })
    } 
 }
   private prepareSave(value): any {
    const inputData: any = {
      'firstName': value.firstName,
      'lastName': value.lastName,
      'email': value.email,
      'password': value.password
    };
     return inputData;
   }
}
