import {Component, OnInit} from '@angular/core';
import {UserSubscription, UserSubscriptionCheck} from "../../models/subscription.models";
import {GetSubscriptionsAPIResponse} from "../../api_responses/subscriptions.get.models";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {CustomSnakbar} from "../../helpers/custom.snakbar";
import {UserAPIServices} from "../../services/user.services";
import {CustomLocalStorage} from "../../helpers/custom.storage";
import {SubscriptionsAPIServices} from "../../services/subscriptions.service";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  stripePopup: Window | null = null;
  checkCalled: boolean = false;
  subModel = new UserSubscription();
  selectedCard: string = '';
  subscriptionPlans: GetSubscriptionsAPIResponse[] | Array<any> = [];
  validPlans: Array<String> = []

  constructor(private router: Router, private snackBar: CustomSnakbar, private customLocalStore: CustomLocalStorage, private subscriptionsAPIServices: SubscriptionsAPIServices, private authService: AuthService) {
  }

  ngOnInit() {
    this.subscriptionsAPIServices.getSubscriptionPlansData()
      .subscribe((response) => {
        this.subscriptionPlans = response.data;
        this.validPlans = this.subscriptionPlans.map(el => el.priceData.id)
      }, error => {
        console.log(error)
      });
    if (this.customLocalStore.getSessionStorage("accessToken")) {
      this.router.navigate(['/home'])
    } else {
      window.localStorage.clear();
      window.sessionStorage.clear();
    }
  }


  selectCard(priceId: string, prodId: string) {
    this.selectedCard = priceId;
    this.subModel.price_id = priceId
    this.subModel.prod_id = prodId
  }


  async subscriptionCheck(data: UserSubscriptionCheck) {
    this.checkCalled = true
    this.subscriptionsAPIServices.validateSubscriptionPlansData(data).subscribe(response => {
      if (['active', 'trailing'].includes(response.subscriptionValid)) {
        this.router.navigate(['/home'])

      } else {
        this.snackBar.snackBarError({
          "status": '500',
          'message': 'Something went wrong! If your payment was done but still got this message kindly contact support team!'
        })
      }
    }, error => {
      this.snackBar.snackBarError({
        "status": '500',
        'message': 'Something went wrong! If your payment was done but still got this message kindly contact support team!'
      })
    })
  }

  validateSubscription(form: NgForm) {
    this.subscriptionsAPIServices.createSubscriptionPlansData(this.subModel).subscribe(response => {
      const checkSubscription: UserSubscriptionCheck = new UserSubscriptionCheck(response.subscriptionId, response.priceId, response.prodId)
      if (response.subscription) {
        this.subscriptionCheck(checkSubscription)
      } else if (response.intent && response.intent.nextAction) {
        const url = response.intent.nextAction.useStripeSdk.stripeJs;
        this.stripePopup = window.open(url, 'stripePopup', `toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=${890},height=${890}`);

        const intervalId = window.setInterval(() => {
          if (this.stripePopup?.closed && !this.checkCalled) {
            this.subscriptionCheck(checkSubscription);
          }
        }, 500);
      }
    }, error => {
      this.snackBar.snackBarError({
        "status": '500',
        'message': 'Something went wrong! If your payment was done but still got this message kindly contact support team!'
      })
    })

  }

}
