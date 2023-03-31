import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {CustomLocalStorage} from "../helpers/custom.storage";
import {AuthService} from "../services/auth.service";
import {SubscriptionsAPIServices} from "../services/subscriptions.service";
import {verifySubscriptionAPIResponse} from "../api_responses/subscriptions.get.models";

@Injectable()
export class AuthActivateRouteGuard implements CanActivate {
  private userId: number | null | string = null;

  constructor(private router: Router, private customLocalStore: CustomLocalStorage, private authService: AuthService, private subscriptionsAPIServices: SubscriptionsAPIServices) {

  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("CHECKED")
    if (!this.authService.validateData()) {
      return false;
    }
    if (['/createSubscription', '/logout'].includes(state.url)) {
      return true
    } else {
      const isSubscribed = await this.checkSubscribed();
      if (!isSubscribed) {
        this.router.navigate(['/createSubscription']);
        return false;
      } else {
        return true;
      }
    }


  }

  async checkSubscribed(): Promise<boolean> {
    try {
      const response: verifySubscriptionAPIResponse | undefined = await this.subscriptionsAPIServices.verifySubscriptionStatus().toPromise();
      if (response) {
        return response.subscriptionStatus;
      } else {
        return false
      }

    } catch (error) {
      return false;
    }
  }
}
