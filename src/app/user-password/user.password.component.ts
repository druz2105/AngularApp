import {Component} from '@angular/core';
import {UserPasswordChange, UserRegister} from "../../models/user.models";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {CustomSnakbar} from "../../helpers/custom.snakbar";
import {UserAPIServices} from "../../services/user.services";
import {CustomLocalStorage} from "../../helpers/custom.storage";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-user-password',
  templateUrl: './user.password.component.html',
  styleUrls: ['./user.password.component.css']
})
export class UserPasswordComponent {

  model = new UserPasswordChange();

  constructor(private http: HttpClient, private router: Router, private snackBar: CustomSnakbar, private usersAPI: UserAPIServices, private customLocalStore: CustomLocalStorage) {
  }

  matchPassword() {
    return this.model.password === this.model.confirmPassword
  }

  validateForm(form: NgForm) {
    if (form.valid) {
      this.usersAPI.passWordChangeAPI(this.model).subscribe(response => {
        this.snackBar.snackBarSuccess("Password Change")
      }, error => {
        this.snackBar.snackBarError(error)
      })
    } else {
      this.snackBar.snackBarError({status: "FAILED", message: "Invalid Form"})
    }
  }

}
