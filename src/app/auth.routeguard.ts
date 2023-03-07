import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router} from '@angular/router';
import {UserDetail} from "../models/user.models";
import {customLocalStorage} from "../helpers/custom.storage";

@Injectable()
export class AuthActivateRouteGuard implements CanActivate {
  user = new UserDetail();

  constructor(private router: Router, private customLocalStore: customLocalStorage) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.customLocalStore.getSessionStorage('userDetails')) {
      this.user = JSON.parse(this.customLocalStore.getSessionStorage('userDetails')!);
    }
    if (!this.user || this.user.id.length == 0) {
      this.router.navigate(['login']);
    }
    return !!this.user;
  }

}



@Injectable()
export class CheckAuthentication implements CanActivate {
  user = new UserDetail();

  constructor(private router: Router, private customLocalStore: customLocalStorage){

  }

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot){
    if(this.customLocalStore.getSessionStorage('userDetails')){
      this.user = JSON.parse(this.customLocalStore.getSessionStorage('userDetails')!);
    }
    if(this.user && this.user.id.length !== 0){
      this.router.navigate(['/home']);
    }
    return !!this.user;
  }

}

