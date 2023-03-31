import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

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
import {CustomLocalStorage} from "../helpers/custom.storage";
import {UserProfileComponent} from './user-profile/user-profile.component';
import {NgxPopper} from "angular-popper";
import {LogoutComponent} from './logout/logout.component';
import {AuthActivateRouteGuard} from "./auth.routeguard";
import {AuthHeaders} from "../helpers/user.auth.header";
import {UserPasswordComponent} from './user-password/user.password.component';
import {CustomStripe} from "../helpers/custom.stripe";
import {CardComponent} from './card/card.component';
import {SubscriptionComponent} from './subscription/subscription.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadersComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HomeComponent,
    UserProfileComponent,
    LogoutComponent,
    UserPasswordComponent,
    CardComponent,
    SubscriptionComponent,

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
    MatCardModule,
    NgbModule,
    NgxPopper,
  ],
  providers: [MatSnackBar, CustomSnakbar, AuthService, CustomLocalStorage, HomeComponent, AuthActivateRouteGuard, AuthHeaders, CustomStripe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
