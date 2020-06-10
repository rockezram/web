import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component:EmployeeCreateComponent, canActivate:[AuthGuard] },
  { path: 'edit-employee/:id', component: EmployeeEditComponent,canActivate:[AuthGuard]},
  { path: 'employees-list', component: EmployeeListComponent ,canActivate:[AuthGuard]}  ,
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  { path: 'create-employee', component: EmployeeCreateComponent,canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }