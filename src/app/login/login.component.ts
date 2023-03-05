import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserLogin} from "../../models/user.models";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserAPIServices} from "../../services/user.services";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {SnakBarConstants} from "../../constants/snakbar.constants";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('state', [
      state('done', style({
        opacity: 0
      })),
      transition('* => done', [
        animate('1s')
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {

  model = new UserLogin()

  constructor(private http: HttpClient, private router: Router, private snackBar: SnakBarConstants, private usersAPI: UserAPIServices) {
  }


  ngOnInit() {
    window.localStorage.clear();
    window.sessionStorage.clear();
  }


  validateLogin(form: NgForm) {
    this.usersAPI.loginAPI(this.model).subscribe(
      (response) => {
        // API call was successful, redirect to another page
        window.localStorage.setItem('accessToken', response.access);
        window.localStorage.setItem('refreshToken', response.refresh);
        window.localStorage.setItem('userId', response.userId);
        this.router.navigate(['/home'])
      },
      (error) => {
        // API call failed, display error message
        console.error(error);
        this.snackBar.snackBarError(error)
        // You can display the error message in the template or using a toast notification library
      }
    );
  }

}
