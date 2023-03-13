import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, CanDeactivate} from '@angular/router';
import {CustomLocalStorage} from "../helpers/custom.storage";
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthActivateRouteGuard implements CanActivate {
  private userId: number | null | string = null;

  constructor(private router: Router, private customLocalStore: CustomLocalStorage, private authService: AuthService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.validateData()
  }

}
