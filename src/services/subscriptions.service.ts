import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConstants} from 'src/constants/app.constants';
import {environment} from 'src/constants/environments';
import {CustomLocalStorage} from "../helpers/custom.storage";
import {
  checkSubscriptionAPIResponse,
  createSubscriptionAPIResponse,
  GetSubscriptionsAPIResponse
} from "../api_responses/subscriptions.get.models";
import {loadStripe, Card, Token} from '@stripe/stripe-js';
import {UserSubscription, UserSubscriptionCheck} from "../models/user.models";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsAPIServices implements OnInit {


  ngOnInit() {
    // Now the stripe object is initialized and you can use it.
  }

  constructor(private http: HttpClient, private customLocalStore: CustomLocalStorage) {
  }

  getSubscriptionPlansData() {
    return this.http.get<GetSubscriptionsAPIResponse>(`${environment.rooturl}${AppConstants.SUBSCRIPTIONS_PLANS_API}`,)
  }

  createSubscriptionPlansData(userSubscription: UserSubscription) {
    if (userSubscription.cardDetails.cardExpire) {
      let cardData = {...userSubscription.cardDetails}
      let data = {...userSubscription}

      delete cardData.cardExpire
      cardData.exp_month = userSubscription.cardDetails.cardExpire?.split('/')[0]
      cardData.exp_year = userSubscription.cardDetails.cardExpire?.split('/')[1]
      data.cardDetails = cardData
      return this.http.post<createSubscriptionAPIResponse>(`${environment.rooturl}${AppConstants.SUBSCRIPTIONS_CREATE_API}`, data)
    } else {
      return this.http.post<createSubscriptionAPIResponse>(`${environment.rooturl}${AppConstants.SUBSCRIPTIONS_CREATE_API}`, userSubscription)
    }
  }

  checkSubscriptionPlansData(data: UserSubscriptionCheck) {
    return this.http.post<checkSubscriptionAPIResponse>(`${environment.rooturl}${AppConstants.SUBSCRIPTIONS_CHECK_API}`, data)
  }


}
