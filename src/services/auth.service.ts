import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../constants/environments";
import {LoginAPIResponse} from "../api_responses/user.get.models";
import {Injectable} from "@angular/core";
import {customLocalStorage} from "../helpers/custom.storage";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly VERIFY_TOKEN_URL = 'verify/';
  private readonly REFRESH_TOKEN_URL = 'refresh/';


  constructor(private http: HttpClient, private router: Router, private customLocalStore: customLocalStorage) {
  }


  private verifyTokenAPI(token: string) {
    return this.http.post(environment.rooturl + this.VERIFY_TOKEN_URL, {
      'token': token
    })
  }

  private refreshTokenAPI(refreshToken: string) {
    return this.http.post<LoginAPIResponse>(environment.rooturl + this.REFRESH_TOKEN_URL, {
      refresh: refreshToken
    })
  }

  validateAccessToken(token: string) {
    return this.verifyTokenAPI(token).subscribe(
      (response) => {
      },
      error => {
        this.refreshToken()
      }
    )
  }

  private refreshToken() {
    const refreshToken = this.customLocalStore.getSessionStorage('refreshToken');
    if (!refreshToken) {
      this.router.navigate(['/login'])
    } else {
      this.refreshTokenAPI(refreshToken).subscribe(response => {
        this.customLocalStore.storeUserLogin(response)
      }, error => {
        this.router.navigate(['/login'])
      });
    }
  }

  validateData() {
    const token = this.customLocalStore.getSessionStorage('accessToken')
    if (token) {
      this.validateAccessToken(token)
    } else {
      this.router.navigate(['/login'])
    }
  }
}
