import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path:'login', component:LoginComponent },
  {path:'signup', component:RegisterComponent },
  {
    path : 'todo',loadChildren:()=> import('./todo/todo.module').then(m=>m.TodoModule),
    canActivate: [AuthGuard] 
  },
  // {path: '**', component:PageNotFoundComponent }, 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
