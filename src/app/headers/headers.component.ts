import {Component, OnInit} from '@angular/core';
import {UserDetail} from "../../models/user.models";
import {customLocalStorage} from "../../helpers/custom.storage";
import {HomeComponent} from "../home/home.component";
import {UserAPIServices} from "../../services/user.services";

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent implements OnInit {

  user = new UserDetail();


  constructor(private customLocalStore: customLocalStorage, private homeComponent: HomeComponent, private userAPIServices: UserAPIServices) {
  }

  ngOnInit(): void {
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
    window.addEventListener('scroll', function () {
      const nav = document.getElementById('styleNav');
      if (nav !== null) {
        if (window.pageYOffset > nav.offsetTop) {
          nav.classList.add('sticky');
        } else {
          nav.classList.remove('sticky');
        }
      }
    });
  }


  setPanelName(panelName: string) {
    this.homeComponent.setPanelName(panelName)
  }

}
