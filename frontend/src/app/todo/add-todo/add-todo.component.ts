import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, FormBuilder , ReactiveFormsModule, Validators} from '@angular/forms';
import { genralConfig } from 'src/app/core/constant/genral-config.constant';
import {TodoService} from '../services/todo.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddTodoComponent implements OnInit {
  addTaskForm: FormGroup;
  userId:any;
  isChecked:boolean=false;
  minDate:any;
  constructor(public dialogRef: MatDialogRef<AddTodoComponent>,
    private _formBuilder: FormBuilder,
    public todoService: TodoService, 
    public datepipe: DatePipe, 
    public router: Router,
    public toastr:ToastrService,) { }

  ngOnInit() {
    this.minDate = new Date();
    this.userId = localStorage.getItem('userId');
    this.addTaskForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(genralConfig.pattern.NAMEMAXLENGTH), Validators.minLength(genralConfig.pattern.NAMEMINLENGTH)]],
      description: ['',[Validators.required]],
      date: ['', [Validators.required]],
      isChecked: false
    });
  }

  setcheckbox(data){
    this.isChecked= data;
    this.addTaskForm.get('isChecked').setValue(this.isChecked);
    console.log(data,"checkbox")
  }

  AddTask(){
    console.log("his.addTaskForm.valid", this.addTaskForm.valid)
    console.log("his.addTaskForm.valid", this.addTaskForm)
    if (this.addTaskForm.valid) {
      let formModel =  this.prepareSave(this.addTaskForm.value);
      
    this.todoService.addTask(formModel).subscribe((res: any) => {
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
      'isChecked': task.isChecked
    }
    
    return inputData;
  }
  // resettask(){
  //   this.router.navigate(['/todo']);
  //   this.addTaskForm.reset();
  // }

}
