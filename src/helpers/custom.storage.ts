import {Injectable} from "@angular/core";
import {LoginAPIResponse} from "../api_responses/user.get.models";

@Injectable({
  providedIn: 'root'
})
export class CustomLocalStorage {

  setLocalStorage(key: string, value: any) {
    window.localStorage.setItem(key, value)
  }

  getLocalStorage(key: string) {
    return window.localStorage.getItem(key)
  }

  setSessionStorage(key: string, value: any) {
    window.sessionStorage.setItem(key, value)
  }

  getSessionStorage(key: string) {
    return window.sessionStorage.getItem(key)
  }

  storeUserLogin(response: LoginAPIResponse) {
    this.setSessionStorage('accessToken', response.access);
    this.setSessionStorage('refreshToken', response.refresh);
    this.setSessionStorage('userId', response.userId);
    this.setSessionStorage('subscriptionStatus', response.subscriptionStatus);
  }

}
