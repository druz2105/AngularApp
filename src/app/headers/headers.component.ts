import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CustomLocalStorage} from "../../helpers/custom.storage";
import {HomeComponent} from "../home/home.component";
import {UserAPIServices} from "../../services/user.services";
import {NgbPopover} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent implements OnInit {
  @ViewChild('popover', {static: false}) popover!: NgbPopover;
  @ViewChild('dropdown', {static: false}) dropdown!: ElementRef;

  accessToken = this.customLocalStore.getSessionStorage('accessToken')

  constructor(private customLocalStore: CustomLocalStorage, private userAPIServices: UserAPIServices) {
  }

  ngOnInit(): void {
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



}
