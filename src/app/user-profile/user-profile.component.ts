import {Component, OnInit} from '@angular/core';
import {UserDetail} from "../../models/user.models";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {UserAPIServices} from "../../services/user.services";
import {customLocalStorage} from "../../helpers/custom.storage";
import {HomeComponent} from "../home/home.component";
import {NgForm} from "@angular/forms";
import {CustomSnakbar} from "../../helpers/custom.snakbar";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  private panelName: string = '';

  user = new UserDetail();

  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private userAPIServices: UserAPIServices, private customLocalStore: customLocalStorage, private homeComponent: HomeComponent, private snackBar: CustomSnakbar) {
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

  setPanelName(panelName: string) {
    this.homeComponent.setPanelName(panelName)
  }

  validateForm(form: NgForm) {
    this.userAPIServices.userUpdateAPI(this.user).subscribe(
      (response) => {
        console.log(response)
      },
      error => {
        this.snackBar.snackBarError(error)
      }
    )
  }
}
