import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {UserLogin, UserRegister} from "src/models/user.models";
import {AppConstants} from 'src/constants/app.constants';
import {environment} from 'src/constants/environments';
import {LoginAPIResponse, UserDetail} from 'src/models/user.get.models';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserAPIServices {


  constructor(private http: HttpClient) {

  }

  registerAPI(userData: UserRegister) {
    // const registerData = this.createRegisterData(userData)
    return this.http.post(environment.rooturl + AppConstants.REGISTER_API, userData)
  }

  loginAPI(loginData: UserLogin) {
    return this.http.post<LoginAPIResponse>(environment.rooturl + AppConstants.LOGIN_API, loginData)
  }

  userDetailAPI(user_id: string) {
    return this.http.get<UserDetail>(`${environment.rooturl}${AppConstants.USER_DETAIL_API}${user_id}/`)
  }

}
