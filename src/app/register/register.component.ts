import {Component} from '@angular/core';
import {NgForm, FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserRegister} from "../../models/user.models";
import {UserAPIServices} from "src/services/user.services";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  model = new UserRegister();

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar, private usersAPI: UserAPIServices) {
  }

  matchEmail() {
    return this.model.email === this.model.confirmEmail
  }

  matchPassword() {
    return this.model.password === this.model.confirmPassword
  }

  validateRegister(form: NgForm) {
    this.usersAPI.validateLoginDetails(this.model).subscribe(
      (response) => {
        // API call was successful, redirect to another page
        this.router.navigate(['/login']);
      },
      (error) => {
        // API call failed, display error message
        console.error(error);
        this.snackBar.open('Error: ' + error.message, 'Close', {
          duration: 5000,
          verticalPosition: 'top'
        });
        // You can display the error message in the template or using a toast notification library
      }
    );
  }


}
