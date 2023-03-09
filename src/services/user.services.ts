import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {UserDetail, UserLogin, UserRegister} from "src/models/user.models";
import {AppConstants} from 'src/constants/app.constants';
import {environment} from 'src/constants/environments';
import {LoginAPIResponse, GetUserDetailAPIResponse} from 'src/api_responses/user.get.models';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserAPIServices {


  constructor(private http: HttpClient) {

  }

  updateUser(user: UserDetail) {
    return {'email': user.email, 'firstName': user.firstName, 'lastName': user.lastName}
  }

  registerAPI(userData: UserRegister) {
    // const registerData = this.createRegisterData(userData)
    return this.http.post(environment.rooturl + AppConstants.REGISTER_API, userData)
  }

  loginAPI(loginData: UserLogin) {
    return this.http.post<LoginAPIResponse>(environment.rooturl + AppConstants.LOGIN_API, loginData)
  }

  userDetailAPI(user_id: string) {
    return this.http.get<GetUserDetailAPIResponse>(`${environment.rooturl}${AppConstants.USER_DETAIL_API}${user_id}/`)
  }

  userUpdateAPI(userData: UserDetail) {
    const updateData = this.updateUser(userData)
    console.log(updateData)
    return this.http.put<GetUserDetailAPIResponse>(`${environment.rooturl}${AppConstants.USER_DETAIL_API}${userData.id}/`, updateData)
  }

}
