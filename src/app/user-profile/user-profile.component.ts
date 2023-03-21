import {Component, OnInit} from '@angular/core';
import {UserDetail} from "../../models/user.models";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {UserAPIServices} from "../../services/user.services";
import {CustomLocalStorage} from "../../helpers/custom.storage";
import {HomeComponent} from "../home/home.component";
import {NgForm} from "@angular/forms";
import {CustomSnakbar} from "../../helpers/custom.snakbar";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  private panelName: string = '';

  user = new UserDetail();

  profileImgUrl: string = '';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private userAPIServices: UserAPIServices, private customLocalStore: CustomLocalStorage, private homeComponent: HomeComponent, private snackBar: CustomSnakbar) {
  }


  ngOnInit() {
    this.userAPIServices.userDetailAPI().subscribe(
      (response) => {
        this.profileImgUrl = response.image.replace('minio', 'localhost')
        this.user = new UserDetail(...Object.values(response))
      },
      (error) => {
      }
    )
  }

  setPanelName(panelName: string) {
    this.homeComponent.setPanelName(panelName)
  }

  selectProfileImage(): void {
    const input = document.getElementById('profile-image-input') as HTMLInputElement;
    const img = document.getElementById('profile-img') as HTMLImageElement;

    input.onchange = () => {
      if (input.files) {
        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = () => {
          console.log(reader.result)
          img.src = reader.result as string;
          const formData = new FormData();

          formData.append("images", file);

          this.userAPIServices.profileImageUpdateAPI(formData).subscribe(
            (response) => {
              console.log(response);
            },
            (error) => {
              console.error(error);
            }
          );
        }

        if (file) {
          reader.readAsDataURL(file);
        }
      }
    };

    input.click();
  }


  validateForm(form: NgForm) {
    this.userAPIServices.userUpdateAPI(this.user).subscribe(
      (response) => {
      },
      error => {
        this.snackBar.snackBarError(error)
      }
    )
  }
}
