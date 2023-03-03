import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";
import {environment} from 'src/constants/environments';
import {AppConstants} from 'src/constants/app.constants';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  },);

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {
  }


  get fullName() {
    return this.registerForm.get('fullName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  fullNameErrors = ''
  emailErrors = ''
  passwordErrors = ''
  c_passwordErrors = ''


  nameValidator() {
    const fullName = this.fullName?.value
    const regex = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
    if (fullName && regex.test(fullName)) {

      this.fullNameErrors = 'Name can not contain digits or special symbol';
    } else {
      this.fullNameErrors = '';
    }
  }

  emailValidator() {
    const email = this.email?.value
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email && emailRegex.test(email)) {
      this.emailErrors = ''
    } else {

      this.emailErrors = 'Enter a valid email, example: abc@example.com'
    }
  }

  passWordValidator() {
    const password = this.password?.value
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d-+_!@#$%^&*.,?]{8,}$/
    if (password && passwordRegex.test(password)) {
      this.passwordErrors = ''
    } else {

      this.passwordErrors = '<ul><li>At least 8 characters in length</li><li>Contains at least one uppercase letter</li><li>Contains at least one lowercase letter</li><li>Contains at least one numeric digit</li></ul>'
    }
  }

  confirmPassWordValidator() {

    const password = this.password?.value
    const c_password = this.confirmPassword?.value
    if (password && c_password && c_password === password) {
      this.c_passwordErrors = ''
    } else {
      this.c_passwordErrors = 'Password Does Not Match!!'
    }
  }

  onSubmit() {
    this.nameValidator()
    this.emailValidator()
    this.passWordValidator()
    this.confirmPassWordValidator()
    const fullName: string[] = this.fullName?.value ? this.fullName.value.split(" ") : ''.split('')
    const registerData = {
      'first_name': fullName[0],
      'last_name': fullName[fullName.length - 1],
      'email': this.email?.value,
      'password': this.password?.value

    }
    this.http.post(environment.rooturl+ AppConstants.REGISTER, registerData).subscribe(
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
