import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent implements OnInit {
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
