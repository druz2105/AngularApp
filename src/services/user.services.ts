import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {UserRegister} from "src/models/user.models";
import {Observable, Subject} from 'rxjs';
import {AppConstants} from 'src/constants/app.constants';
import {environment} from 'src/constants/environments';

@Injectable({
  providedIn: 'root'
})
export class UserAPIServices {

  constructor(private http: HttpClient) {

  }

  createRegisterData(userData: UserRegister) {
    return {
      "email": userData.email,
      "first_name": userData.firstName,
      "last_name": userData.lastName,
      "password": userData.password,
    }
  }

  validateLoginDetails(userData: UserRegister) {
    const registerData = this.createRegisterData(userData)
    return this.http.post(environment.rooturl + AppConstants.REGISTER, registerData)
  }

}
