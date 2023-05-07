import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConstants} from 'src/constants/app.constants';
import {environment} from 'src/constants/environments';
import {CustomLocalStorage} from "../helpers/custom.storage";
import {
  cancelSubscriptionAPIResponse,
  createSubscriptionAPIResponse,
  GetSubscriptionsAPIResponse,
  validateSubscriptionAPIResponse, verifySubscriptionAPIResponse
} from "../api_responses/subscriptions.get.models";
import {UserSubscription, UserSubscriptionCheck} from "../models/subscription.models";

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
    const headers = new HttpHeaders({
      'Authorization': 'JWT ' + this.customLocalStore.getSessionStorage('accessToken'),
    });
    return this.http.get<GetSubscriptionsAPIResponse>(`${environment.rooturl}${AppConstants.SUBSCRIPTIONS_PLANS_API}`, {headers})
  }

  createSubscriptionPlansData(userSubscription: UserSubscription) {
    const headers = new HttpHeaders({
      'Authorization': 'JWT ' + this.customLocalStore.getSessionStorage('accessToken'),
    });
    if (userSubscription.cardDetails.cardExpire) {
      let cardData = {...userSubscription.cardDetails}
      let data = {...userSubscription}

      delete cardData.cardExpire
      cardData.exp_month = userSubscription.cardDetails.cardExpire?.split('/')[0]
      cardData.exp_year = userSubscription.cardDetails.cardExpire?.split('/')[1]
      data.cardDetails = cardData
      return this.http.post<createSubscriptionAPIResponse>(`${environment.rooturl}${AppConstants.SUBSCRIPTIONS_CREATE_API}`, data, {headers})
    } else {
      return this.http.post<createSubscriptionAPIResponse>(`${environment.rooturl}${AppConstants.SUBSCRIPTIONS_CREATE_API}`, userSubscription, {headers})
    }
  }

  validateSubscriptionPlansData(data: UserSubscriptionCheck) {
    const headers = new HttpHeaders({
      'Authorization': 'JWT ' + this.customLocalStore.getSessionStorage('accessToken'),
    });
    return this.http.post<validateSubscriptionAPIResponse>(`${environment.rooturl}${AppConstants.SUBSCRIPTIONS_VALIDATE_API}`, data, {headers})
  }


  verifySubscriptionStatus() {
    const headers = new HttpHeaders({
      'Authorization': 'JWT ' + this.customLocalStore.getSessionStorage('accessToken'),
    });
    return this.http.get<verifySubscriptionAPIResponse>(`${environment.rooturl}${AppConstants.SUBSCRIPTIONS_VERIFY_API}`, {headers})
  }

  cancelSubscription() {
    const headers = new HttpHeaders({
      'Authorization': 'JWT ' + this.customLocalStore.getSessionStorage('accessToken'),
    });
    console.log(headers)
    return this.http.patch<cancelSubscriptionAPIResponse>(`${environment.rooturl}${AppConstants.SUBSCRIPTIONS_CANCEL_API}`, {}, {headers})
  }


}
