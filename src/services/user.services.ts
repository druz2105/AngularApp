import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {UserLogin, UserRegister} from "src/models/user.models";
import {AppConstants} from 'src/constants/app.constants';
import {environment} from 'src/constants/environments';
import {LoginAPIResponse} from 'src/services/user.get.services';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserAPIServices {

  private readonly VERIFY_TOKEN_URL = 'verify/';
  private readonly REFRESH_TOKEN_URL = 'refresh/';

  constructor(private http: HttpClient) {

  }

  callRegisterAPI(userData: UserRegister) {
    // const registerData = this.createRegisterData(userData)
    return this.http.post(environment.rooturl + AppConstants.REGISTER, userData)
  }

  callLoginAPI(loginData: UserLogin) {
    return this.http.post<LoginAPIResponse>(environment.rooturl + AppConstants.LOGIN, loginData)
  }

  callVerifyAPI(token: string) {
    return this.http.post(environment.rooturl + this.VERIFY_TOKEN_URL, {
      'token': token
    })
  }

  callRefreshAPI(refresh_token: string) {
    return this.http.post<LoginAPIResponse>(environment.rooturl + this.REFRESH_TOKEN_URL, {
      refresh: refresh_token
    })
  }

}
