import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserDetail} from "../../models/user.models";
import {AuthService} from "../../services/auth.service";
import {UserAPIServices} from "../../services/user.services";
import {CustomLocalStorage} from "../../helpers/custom.storage";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private panelName: string = 'dashboard';

  user = new UserDetail();

  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private userAPIServices: UserAPIServices, private customLocalStore: CustomLocalStorage) {
  }


  ngOnInit() {
    this.authService.validateData()
    const userId = this.customLocalStore.getSessionStorage('userId')
    if (userId) {
      // this.user = JSON.parse(this.customLocalStore.getSessionStorage('userDetails')!)
      this.userAPIServices.userDetailAPI(userId).subscribe(
        (response) => {
          this.user = new UserDetail(...Object.values(response))
        },
        (error) => {
        }
      )
    }
  }

  get getPanelName() {
    return this.panelName;
  }

  setPanelName(panelName: string) {
    this.panelName = panelName;
  }
}
