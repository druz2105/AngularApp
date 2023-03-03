import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserLogin} from "../../models/user.models";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  model = new UserLogin()

  validateLogin(form: NgForm) {
  }

}
