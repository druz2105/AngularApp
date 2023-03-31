import {Component, OnInit} from '@angular/core';
import {UserDetail} from "../../models/user.models";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {UserAPIServices} from "../../services/user.services";
import {CustomLocalStorage} from "../../helpers/custom.storage";
import {NgForm} from "@angular/forms";
import {CustomSnakbar} from "../../helpers/custom.snakbar";
import {CardModel} from "../../models/card.models";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  private panelName: string = 'userProfilePanel';
  cardPanel: string = 'cardDetails';

  user = new UserDetail();
  cardModel = new CardModel();

  stripeDetails: any;

  profileImgUrl: string = '';


  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private userAPIServices: UserAPIServices, private customLocalStore: CustomLocalStorage, private snackBar: CustomSnakbar) {
  }


  ngOnInit() {
    this.userAPIServices.userDetailAPI().subscribe(
      (response) => {
        this.profileImgUrl = response.image.replace('minio', 'localhost')
        this.user = new UserDetail(...Object.values(response))
      },
      (error) => {
        this.snackBar.snackBarError(error)
      }
    )
    this.userAPIServices.stripeDetailAPI().subscribe(
      (response) => {
        this.stripeDetails = response
      },
      (error) => {
        this.snackBar.snackBarError(error)
      }
    )
  }

  changePanelName(panelName: string) {
    this.panelName = panelName
    this.cardPanel = 'cardDetails'
  }

  changeCardPanel(panelName: string) {
    this.cardPanel = panelName
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
              this.snackBar.snackBarSuccess('Profile Image Changed!')
            },
            (error) => {
              this.snackBar.snackBarError(error)
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

  getPanelName() {
    return this.panelName
  }


  validateForm(form: NgForm) {
    this.userAPIServices.userUpdateAPI(this.user).subscribe(
      (response) => {
        this.snackBar.snackBarSuccess('User Details Changed!')
      },
      error => {
        this.snackBar.snackBarError(error)
      }
    )
  }

  changeCard(form: NgForm) {

  }
}
