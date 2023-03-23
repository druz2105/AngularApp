import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HomeComponent} from "./home/home.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {LogoutComponent} from "./logout/logout.component";
import {AuthActivateRouteGuard} from "./auth.routeguard";
import {UserPasswordComponent} from "./user-password/user.password.component";

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent, canActivate: [AuthActivateRouteGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthActivateRouteGuard]},
  {path: 'userProfile', component: UserProfileComponent, canActivate: [AuthActivateRouteGuard]},
  {path: 'changePassword', component: UserPasswordComponent, canActivate: [AuthActivateRouteGuard]},
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
