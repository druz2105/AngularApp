import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserRegister} from "../../models/user.models";
import {UserAPIServices} from "src/services/user.services";
import {CustomSnakbar} from "../../helpers/custom.snakbar";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model = new UserRegister();

  constructor(private http: HttpClient, private router: Router, private snackBar: CustomSnakbar, private usersAPI: UserAPIServices) {
  }

  ngOnInit() {
    window.localStorage.clear();
    window.sessionStorage.clear();
  }

  matchPassword() {
    return this.model.password === this.model.confirmPassword
  }

  validateRegister(form: NgForm) {
    this.usersAPI.registerAPI(this.model).subscribe(
      (response) => {
        // API call was successful, redirect to another page
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error(error);
        this.snackBar.snackBarError(error)
      }
    );
  }


}
