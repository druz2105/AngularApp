import {Component, OnInit} from '@angular/core';
import {CustomLocalStorage} from "../../helpers/custom.storage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(private customLocalStore: CustomLocalStorage, private router: Router) {
  }

  ngOnInit() {
    if (this.customLocalStore.getSessionStorage("accessToken")) {
      this.router.navigate(['/home'])
    } else {
      window.localStorage.clear();
      window.sessionStorage.clear();
    }
  }

}
