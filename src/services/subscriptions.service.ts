import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConstants} from 'src/constants/app.constants';
import {environment} from 'src/constants/environments';
import {CustomLocalStorage} from "../helpers/custom.storage";
import {createSubscriptionAPIResponse, GetSubscriptionsAPIResponse} from "../api_responses/subscriptions.get.models";
import {loadStripe, Card, Token} from '@stripe/stripe-js';
import {UserSubscription} from "../models/user.models";

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

  createSubscriptionPlansData(data: UserSubscription) {
    return this.http.post<createSubscriptionAPIResponse>(`${environment.rooturl}${AppConstants.SUBSCRIPTIONS_CREATE_API}`, data)
  }


}
