import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserDetail, UserLogin, UserPasswordChange, UserRegister} from "src/models/user.models";
import {AppConstants} from 'src/constants/app.constants';
import {environment} from 'src/constants/environments';
import {
  GetUserDetailAPIResponse,
  LoginAPIResponse,
  RegisterAPIResponse,
  StripeDetailsAPIResponse
} from 'src/api_responses/user.get.models';
import {CustomLocalStorage} from "../helpers/custom.storage";

@Injectable({
  providedIn: 'root'
})
export class UserAPIServices {


  constructor(private http: HttpClient, private customLocalStore: CustomLocalStorage) {

  }

  updateUser(user: UserDetail) {
    return {'email': user.email, 'firstName': user.firstName, 'lastName': user.lastName}
  }

  registerAPI(userData: UserRegister) {
    // const registerData = this.createRegisterData(userData)
    return this.http.post<RegisterAPIResponse>(environment.rooturl + AppConstants.REGISTER_API, userData)
  }

  loginAPI(loginData: UserLogin) {
    return this.http.post<LoginAPIResponse>(environment.rooturl + AppConstants.LOGIN_API, loginData)
  }

  userDetailAPI() {
    const headers = new HttpHeaders({
      'Authorization': 'JWT ' + this.customLocalStore.getSessionStorage('accessToken'),
    });
    return this.http.get<GetUserDetailAPIResponse>(`${environment.rooturl}${AppConstants.USER_DETAIL_API}`, {headers})
  }

  stripeDetailAPI() {
    const headers = new HttpHeaders({
      'Authorization': 'JWT ' + this.customLocalStore.getSessionStorage('accessToken'),
    });
    return this.http.get<StripeDetailsAPIResponse>(`${environment.rooturl}${AppConstants.STRIPE_DETAIL_API}`, {headers})
  }

  userUpdateAPI(userData: UserDetail) {
    const updateData = this.updateUser(userData)
    const headers = new HttpHeaders({
      'Authorization': 'JWT ' + this.customLocalStore.getSessionStorage('accessToken'),
    });
    return this.http.put<GetUserDetailAPIResponse>(`${environment.rooturl}${AppConstants.USER_DETAIL_API}`, updateData, {headers})
  }

  profileImageUpdateAPI(formData: FormData) {
    const headers = new HttpHeaders({
      'Authorization': 'JWT ' + this.customLocalStore.getSessionStorage('accessToken'),
    });
    return this.http.post(`${environment.rooturl}${AppConstants.USER_IMAGE_UPDATE_API}`, formData, {headers})
  }

  passWordChangeAPI(userPasswordData: UserPasswordChange) {
    const headers = new HttpHeaders({
      'Authorization': 'JWT ' + this.customLocalStore.getSessionStorage('accessToken'),
    });
    const data = {...userPasswordData}
    delete data.confirmPassword
    return this.http.patch(`${environment.rooturl}${AppConstants.USER_PASSWORD_CHANGE_API}`, data, {headers})
  }

}
