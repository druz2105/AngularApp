import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserDetail} from "../../models/user.models";
import {AuthService} from "../../services/auth.service";
import {UserAPIServices} from "../../services/user.services";
import {customLocalStorage} from "../../helpers/custom.storage";

@Component({
  selector: 'dotbot-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private panelName: string = 'dashboard';

  user = new UserDetail();

  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private userAPIServices: UserAPIServices, private customLocalStore: customLocalStorage) {
  }


  ngOnInit() {
    this.authService.validateData()
    if (this.customLocalStore.getSessionStorage('userDetails')){
      this.user = JSON.parse(this.customLocalStore.getSessionStorage('userDetails')!)
    }
  }

  get getPanelName() {
    return this.panelName;
  }

  setPanelName(panelName: string) {
    this.panelName = panelName;
  }
}
