import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserRegister, UserSubscription, UserSubscriptionCheck} from "../../models/user.models";
import {UserAPIServices} from "src/services/user.services";
import {CustomSnakbar} from "../../helpers/custom.snakbar";
import {CustomLocalStorage} from "../../helpers/custom.storage";
import {SubscriptionsAPIServices} from "../../services/subscriptions.service";
import {GetSubscriptionsAPIResponse} from "../../api_responses/subscriptions.get.models";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  stripePopup: Window | null = null;
  checkCalled: boolean = false;
  model = new UserRegister();
  subModel = new UserSubscription();
  formName = 'registerForm'

  registered = false
  selectedCard: string = '';
  subscriptionPlans: GetSubscriptionsAPIResponse[] | Array<any> = [];
  validPlans: Array<String> = []

  constructor(private http: HttpClient, private router: Router, private snackBar: CustomSnakbar, private usersAPI: UserAPIServices, private customLocalStore: CustomLocalStorage, private subscriptionsAPIServices: SubscriptionsAPIServices) {
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

  matchPassword() {
    return this.model.password === this.model.confirmPassword
  }

  selectCard(priceId: string) {
    this.selectedCard = priceId;
    this.subModel.price_id = priceId
  }


  validateRegister(form: NgForm) {
    this.usersAPI.registerAPI(this.model).subscribe(
      (response) => {
        this.registered = true
        this.formName = "subscriptionForm"
        this.subModel.email = this.model.email
        this.subModel.user_id = response.id
      },
      (error) => {
        console.error(error);
        this.snackBar.snackBarError(error)
      }
    );
  }

  subscriptionCheck(data: UserSubscriptionCheck) {
    this.checkCalled = true
    this.subscriptionsAPIServices.checkSubscriptionPlansData(data).subscribe(response => {
      this.router.navigate(['/login'])
    }, error => {
      this.snackBar.snackBarError(error)
    })
  }

  validateSubscription(form: NgForm) {
    this.subscriptionsAPIServices.createSubscriptionPlansData(this.subModel).subscribe(response => {
      const checkSubscription: UserSubscriptionCheck = new UserSubscriptionCheck(response.subscriptionId, this.subModel.user_id)
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
      this.snackBar.snackBarError(error)
    })

  }

}
