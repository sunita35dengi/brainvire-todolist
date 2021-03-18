import { Component, OnInit, ViewEncapsulation,  ViewChild} from '@angular/core';
import { DatePipe } from '@angular/common';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { MatDialog,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { EditTodoComponent } from '../edit-todo/edit-todo.component';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TodoService } from '../services/todo.service';
import { genralConfig } from 'src/app/core/constant/genral-config.constant';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { saveAs } from 'file-saver';
// import { listLocales } from 'ngx-bootstrap/bs-moment';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @ViewChild('delModel', {static: false}) delModel: any;
  @ViewChild('exportModel', {static: false}) exportModel: any;

  closeResult: string;
  noRecordFound: boolean = false;
  page = genralConfig.paginator.PAGE;
  count = genralConfig.paginator.COUNT;
  date:any;
  todoListData: any;
  totalCount: any;
  sortValue: any;
  sortOrder: any;
  userId:any;
  taskId:any
  taskDateForm: FormGroup;
  
  constructor(private modalService: NgbModal,public dialog: MatDialog, public datepipe: DatePipe, public todoService: TodoService, private toastr: ToastrService,
    private _formBuilder: FormBuilder, public router: Router, private _localeService: BsLocaleService) {
    
     }
  ngOnInit() {
    this.taskDateForm = this._formBuilder.group({
      start: ['', [Validators.required]],
      end: ['',[Validators.required]]
    });
    this.todoList();
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddTodoComponent,{
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {  
      this.todoList();
    });
  }
  openEditDialog(idtask){
    const dialogRef = this.dialog.open(EditTodoComponent,{
      width: '600px',
      data: {idtask: idtask}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.todoList();   
    });
  }
changeEvent(event){
  this.date = this.datepipe.transform(event.value, 'MM/dd/yyyy');
  this.todoList();
}
changeStartDate(event){
  let startdate =event.value;
  this.taskDateForm.get('start').setValue(startdate);
  this.taskDateForm.get('end').setValue(null);
}
changeEndDate(event){
  let enddate = event.value;
  let startdate = this.taskDateForm.get('start').value;
  if(startdate>enddate){
    this.toastr.error('Start date must be less then end date')
  }else{
   this.taskDateForm.get('end').setValue(enddate);
  }
  console.log(this.taskDateForm.value);
  
}
exportTasks(){
    if(this.taskDateForm.valid){
      let data:any={
        start: this.datepipe.transform(this.taskDateForm.value.start, 'MM/dd/yyyy'),
        end:   this.datepipe.transform(this.taskDateForm.value.end, 'MM/dd/yyyy')
      }
      this.todoService.exportTask({exportDateRangeValue:data}).subscribe((res)=>{
        if (res) {    
          console.log(res)     
          saveAs(res.status.filename,res.status.url);
        }

      })
    }
}
  todoList() {
    let obj = {
      // searchText: this.sponsorFilterForm.value.searchText ? this.sponsorFilterForm.value.searchText : '',
      count: this.count ? this.count : '',
      page: this.page ? this.page : '',
      date: this.date? this.date:null,
      sortValue: this.sortValue ? this.sortValue : '',
      sortOrder: this.sortOrder ? this.sortOrder : '',


    };
    // this.loader = true;
    this.todoService.getTasks(obj).subscribe((res: any) => {
      console.log(res,'res')
      if (res.status=="OK") {
        this.todoListData = res.resultData;
        console.log("this.faqlistgdggdgd", this.todoListData)
        this.totalCount = this.todoListData.length;
        this.noRecordFound = false;
        if (this.todoListData.length == 0) {
          this.noRecordFound = true;
        }

      }
      else {
        this.toastr.error(res.message);
      }
    })
  }
  // paginate(event) {
  //   this.page = event.pageIndex + 1;
  //   this.count = event.pageSize;
  //   this.todoList();
  // }

  deleteEvent() {
    this.todoService.deleteTask({ task_id: this.taskId }).subscribe((res: any) => {
      this.modalService.dismissAll();
      this.todoList();
      if (res.status == "OK") {
        this.toastr.success(res.message);
      }
      else {
        this.toastr.error(res.message);
      }
    })
  }
  open(taskId) {
    this.taskId = taskId;
    this.modalService.open(this.delModel, {ariaLabelledBy: 'modal-basic-title',size: "md",centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  openExpo() {
    this.modalService.open(this.exportModel, {ariaLabelledBy: 'modal-basic-title',size: "400px",centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissExpoReason(reason)}`;
    });
  }

  private getDismissExpoReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  logout(){
    localStorage.clear();
    let url = 'login'
    this.router.navigate([url]);
  }
}
