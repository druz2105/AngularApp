import {Injectable} from "@angular/core";
import {UserDetail} from "../models/user.models";

@Injectable({
  providedIn: 'root'
})
export class customLocalStorage {

  setLocalStorage(key: string, value: any) {
    window.localStorage.setItem(key, value)
  }

  getLocalStorage(key: string) {
    return window.localStorage.getItem(key)
  }

  setSessionStorage(key: string, value: any) {
    window.sessionStorage.setItem(key, value)
    console.log('COmpleted')
  }

  getSessionStorage(key: string) {
    return window.sessionStorage.getItem(key)
  }

  storeUserLogin(response: any) {
    const user = new UserDetail(response.userId, response.firstName, response.lastName, response.email)
    console.log(user)
    this.setSessionStorage('accessToken', response.access);
    this.setSessionStorage('refreshToken', response.refresh);
    this.setSessionStorage('userDetails', JSON.stringify(user));
  }

}
