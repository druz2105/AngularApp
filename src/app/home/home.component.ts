import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserDetail} from "../../models/user.models";
import {AuthService} from "../../services/auth.service";
import {UserAPIServices} from "../../services/user.services";

@Component({
  selector: 'dotbot-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private panelName: string = '';

  user = new UserDetail();

  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private userAPIServices: UserAPIServices) {
  }


  ngOnInit() {
    const token = window.localStorage.getItem('accessToken')
    if (token) {
      this.authService.validateAccessToken(token)
    } else {
      this.router.navigate(['/login'])
    }

  }

  get getPanelName() {
    return this.panelName;
  }

  setPanelName(panelName: string) {
    this.panelName = panelName;
  }
}
