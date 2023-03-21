import {HttpHeaders} from "@angular/common/http";
import {CustomLocalStorage} from "./custom.storage";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthHeaders {

  constructor(private customLocalStore: CustomLocalStorage) {
  }

  headers = new HttpHeaders({
    'Authorization': 'JWT ' + this.customLocalStore.getSessionStorage('accessToken'),
  });
}
