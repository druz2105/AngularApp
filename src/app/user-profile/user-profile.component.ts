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
import {StripeDetailsAPIResponse} from "../../api_responses/user.get.models";
import {SubscriptionsAPIServices} from "../../services/subscriptions.service";

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

  stripeDetails: StripeDetailsAPIResponse | any;
  subscriptionEnd: string = ''
  subscriptionTrialEnd: string = ''

  profileImgUrl: string = '';


  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private userAPIServices: UserAPIServices, private subscriptionsAPIServices: SubscriptionsAPIServices, private customLocalStore: CustomLocalStorage, private snackBar: CustomSnakbar) {
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`
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
        if (['trialing'].includes(response.subscription.status)) {
          const date = new Date(response.subscription.trialEnd * 1000)
          this.subscriptionTrialEnd = this.formatDate(date)
        }
        const date = new Date(response.subscription.currentPeriodEnd * 1000)
        if (["month"].includes(response.subscription.plan.interval)) {
          date.setMonth(date.getMonth() + response.subscription.plan.intervalCount)
        } else if (["year"].includes(response.subscription.plan.interval)) {
          date.setFullYear(date.getFullYear() + response.subscription.plan.intervalCount)
        }
        this.subscriptionEnd = this.formatDate(date)

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
    console.log("CHECK", this.panelName === 'subscriptionsDetailsPanel')
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
    this.userAPIServices.cardChangeAPI(this.cardModel).subscribe(
      (response) => {
        this.snackBar.snackBarSuccess('User Details Changed!')
      },
      error => {
        console.log(error)
        this.snackBar.snackBarError(error)
      }
    )
  }

  cancelSubscription() {
    this.subscriptionsAPIServices.cancelSubscription().subscribe(
      (response) => {
        this.snackBar.snackBarSuccess('Subscription Cancelled Successfully.')
      },
      error => {
        console.log(error)
        this.snackBar.snackBarError(error)
      }
    )
  }
}
