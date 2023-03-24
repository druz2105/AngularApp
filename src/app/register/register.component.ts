import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserRegister, UserSubscription} from "../../models/user.models";
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

  validateSubscription(form: NgForm) {
    console.log(this.subModel);
    if (this.subModel.cardDetails.cardExpire) {

      let cardData = {...this.subModel.cardDetails}
      let data = {...this.subModel}
      delete cardData.cardExpire
      cardData.exp_month = this.subModel.cardDetails.cardExpire?.split('/')[0]
      cardData.exp_year = this.subModel.cardDetails.cardExpire?.split('/')[1]
      data.cardDetails = cardData
      this.subscriptionsAPIServices.createSubscriptionPlansData(data).subscribe(response => {
        console.log(response)
        if (response.subscription) {
          this.router.navigate(['/login'])
        } else if (response.intent && response.intent.nextAction) {
          window.open(response.intent.nextAction.useStripeSdk.stripeJs, "_blank");
        }
      }, error => {
        this.snackBar.snackBarError(error)
      })
    } else {
      this.snackBar.snackBarError({status: 400, message: "Enter valid card expiry"})
    }
  }

}
