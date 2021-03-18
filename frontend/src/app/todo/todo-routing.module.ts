import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';

const routes: Routes = [
  {
    path:'',
    component:TodoComponent,
    children:[
      {
        path:'',
        component:TodoListComponent
      },
      {
        path:'add',
        component:AddTodoComponent
      },
      {
        path:'edit',
        component:EditTodoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
