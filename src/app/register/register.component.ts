import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserRegister} from "../../models/user.models";
import {UserAPIServices} from "src/services/user.services";
import {CustomSnakbar} from "../../helpers/custom.snakbar";
import {CustomLocalStorage} from "../../helpers/custom.storage";
import {SubscriptionsAPIServices} from "../../services/subscriptions.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model = new UserRegister();

  constructor(private http: HttpClient, private router: Router, private snackBar: CustomSnakbar, private usersAPI: UserAPIServices, private customLocalStore: CustomLocalStorage, private subscriptionsAPIServices: SubscriptionsAPIServices) {
  }

  ngOnInit() {
    if (this.customLocalStore.getSessionStorage("accessToken")) {
      this.router.navigate(['/home'])
    } else {
      window.localStorage.clear();
      window.sessionStorage.clear();
    }
  }

  matchPassword() {
    return this.model.password === this.model.confirmPassword
  }


  validateRegister(form: NgForm) {
    this.usersAPI.registerAPI(this.model).subscribe(
      (response) => {
        this.router.navigate(['/login'])
      },
      (error) => {
        console.error(error.error, "ERROR");
        if ('email' in error.error) {
          error.message = error.error.email
        } else {
          error.message = "Some error occurred"
        }
        this.snackBar.snackBarError(error)
      }
    );
  }


}
