import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HomeComponent} from "./home/home.component";
import {AuthActivateRouteGuard, CheckAuthentication} from "./auth.routeguard";

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, canActivate: [CheckAuthentication]},
  {path: 'login', component: LoginComponent, canActivate: [CheckAuthentication]},
  {path: 'register', component: RegisterComponent, canActivate: [CheckAuthentication]},
  {path: 'home', component: HomeComponent, canActivate: [AuthActivateRouteGuard]},
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
