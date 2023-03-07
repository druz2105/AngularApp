import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {HeadersComponent} from './headers/headers.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {RouterLink, RouterOutlet} from "@angular/router";
import {DashboardComponent} from './dashboard/dashboard.component';
import {CustomSnakbar} from "../helpers/custom.snakbar";
import {HomeComponent} from './home/home.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCardModule} from "@angular/material/card";
import {AuthService} from "../services/auth.service";
import {customLocalStorage} from "../helpers/custom.storage";
import {AuthActivateRouteGuard, CheckAuthentication} from "./auth.routeguard";

@NgModule({
  declarations: [
    AppComponent,
    HeadersComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterLink,
    RouterOutlet,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatCardModule
  ],
  providers: [MatSnackBar, CustomSnakbar, AuthService, customLocalStorage, AuthActivateRouteGuard, CheckAuthentication],
  bootstrap: [AppComponent]
})
export class AppModule {
}
