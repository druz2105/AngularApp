import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../constants/environments";
import {LoginAPIResponse} from "../models/user.get.models";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly VERIFY_TOKEN_URL = 'verify/';
  private readonly REFRESH_TOKEN_URL = 'refresh/';


  constructor(private http: HttpClient, private router: Router) {
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
      (data) => {
      },
      error => {
        this.refreshToken()
      }
    )
  }

  refreshToken(): void {
    const refreshToken = window.localStorage.getItem('refreshToken');
    if (!refreshToken) {
      this.router.navigate(['/login'])
    } else {
      this.refreshTokenAPI(refreshToken).subscribe(response => {
        window.localStorage.setItem('accessToken', response.access);
        window.localStorage.setItem('refreshToken', response.refresh);
        window.localStorage.setItem('userId', response.userId);
      }, error => {
        this.router.navigate(['/login'])
      });
    }
  }
}
