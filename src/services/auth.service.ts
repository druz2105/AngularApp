import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../constants/environments";
import {LoginAPIResponse} from "../api_responses/user.get.models";
import {Injectable} from "@angular/core";
import {CustomLocalStorage} from "../helpers/custom.storage";
import {catchError, map, Observable, of} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly VERIFY_TOKEN_URL = 'verify/';
  private readonly REFRESH_TOKEN_URL = 'refresh/';


  constructor(private http: HttpClient, private router: Router, private customLocalStore: CustomLocalStorage) {
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

  validateAccessToken(token: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.verifyTokenAPI(token).subscribe(
        (response) => {
          observer.next(true);
          observer.complete();
        },
        (error) => {
          this.refreshToken().subscribe((result) => {
            observer.next(result);
            observer.complete();
          });
        }
      );
    });
  }


  private refreshToken(): Observable<boolean> {
    const refreshToken = this.customLocalStore.getSessionStorage("refreshToken");
    if (!refreshToken) {
      this.router.navigate(["/login"]);
      return of(false);
    } else {
      return this.refreshTokenAPI(refreshToken).pipe(
        map((response) => {
          this.customLocalStore.storeUserLogin(response);
          return true;
        }),
        catchError((error) => {
          this.router.navigate(["/login"]);
          return of(false);
        })
      );
    }
  }


  validateData(): Observable<boolean> {
    const token = this.customLocalStore.getSessionStorage("accessToken");
    if (token) {
      return this.validateAccessToken(token);
    } else {
      this.router.navigate(["/login"]);
      return of(false);
    }
  }
}
