import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, FormGroup, FormBuilder , ReactiveFormsModule, Validators} from '@angular/forms';
import { genralConfig } from 'src/app/core/constant/genral-config.constant';
import {TodoService} from '../services/todo.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditTodoComponent implements OnInit {
  addTaskForm: FormGroup;
  userId:any;
  idtask:any;
  isChecked:boolean=false;
  minDate:any;
  dateString : any;
  public response;
  constructor(public dialogRef: MatDialogRef<EditTodoComponent>,
    private _formBuilder: FormBuilder,
    public todoService: TodoService, 
    public datepipe: DatePipe, 
    public router: Router,
    public toastr:ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      
     }

  ngOnInit() {
    this.idtask = this.data.idtask;
    console.log(this.idtask, "taskid",this.data)
    this.minDate = new Date();
    this.userId = localStorage.getItem('userId');
    this.addTaskForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(genralConfig.pattern.NAMEMAXLENGTH), Validators.minLength(genralConfig.pattern.NAMEMINLENGTH)]],
      description: ['',[Validators.required]],
      date: ['', [Validators.required]],
      isChecked: false
    });
    this.getTaskById();
  }
  getTaskById(){
    this.todoService.getTaskById({'idtask':this.idtask}).subscribe((res)=>{
    this.response = res;
    this.dateString =moment(new Date(this.response.task_over_due_date*1000)).format("YYYY-MM-DD").toString();
    this.isChecked = this.response.is_completed == 1 ? true : false;
   console.log(this.dateString, "this.dateString", this.response);
   
    let values = {
      name : this.response.name,
      description : this.response.description,
      date : this.dateString,
      isChecked : this.isChecked

    }
    console.log(this.addTaskForm.value, "value", values);
    
    this.addTaskForm.patchValue(values)   
    })
  }
  
  setcheckbox(data){
    this.isChecked= data;
    this.addTaskForm.get('isChecked').setValue(this.isChecked);
    console.log(data,"checkbox")
  }
  EditTask(){
    console.log("his.addTaskForm.valid", this.addTaskForm.valid)
    console.log("his.addTaskForm.valid", this.addTaskForm)
    


    if (this.addTaskForm.valid) {
      let formModel =  this.prepareSave(this.addTaskForm.value);
      
    this.todoService.editTask(formModel).subscribe((res: any) => {
      if (res.status == "OK") {
        this.toastr.success(res.message);
        this.dialogRef.close();
      } else {
        console.log("Add AddTodos Error")
       this.toastr.error(res.message);
      }
    })
    }
  }
  private prepareSave(task:any): any {
    const inputData: any = {
      'name': task.name,
      'description': task.description,
      'task_over_due_date': this.datepipe.transform(task.date, 'MM/dd/yyyy'),
      'isChecked': task.isChecked,
      'task_id': this.idtask
    }
    
    return inputData;
  }
}
