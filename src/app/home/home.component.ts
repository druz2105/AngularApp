import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from "@angular/router";
import {UserAPIServices} from "../../services/user.services";

@Component({
  selector: 'dotbot-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private readonly VERIFY_TOKEN_URL = 'verify/';
  private readonly REFRESH_TOKEN_URL = 'refresh/';

  constructor(private http: HttpClient, private router: Router, private userAPIServices: UserAPIServices) {
  }

  private validateAccessToken(token: string) {
    return this.userAPIServices.callVerifyAPI(token).subscribe(
      (data) => {
      },
      error => {
        this.refreshToken()
      }
    )
  }

  private refreshToken(): void {
    const refresh_token = window.localStorage.getItem('refresh_token');
    if (!refresh_token) {
      this.router.navigate(['/login'])
    } else {
      this.userAPIServices.callRefreshAPI(refresh_token).subscribe(response => {
        window.localStorage.setItem('access_token', response.access);
        window.localStorage.setItem('refresh_token', response.refresh);
      }, error => {
        this.router.navigate(['/login'])
      });
    }
  }

  ngOnInit() {
    const token = window.localStorage.getItem('access_token')
    if (token) {
      this.validateAccessToken(token)
    } else {
      this.router.navigate(['/login'])
    }
  }
}
