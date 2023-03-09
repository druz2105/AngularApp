// import {Injectable} from '@angular/core';
// import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router} from '@angular/router';
// import {UserDetail} from "../models/user.models";
// import {customLocalStorage} from "../helpers/custom.storage";
//
// @Injectable()
// export class AuthActivateRouteGuard implements CanActivate {
//   private userId: number | null | string = null;
//
//   constructor(private router: Router, private customLocalStore: customLocalStorage) {
//
//   }
//
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     this.userId = this.customLocalStore.getSessionStorage('userId');
//     if (this.userId === null || this.userId === '') {
//       this.router.navigate(['login']);
//     }
//     return !!this.userId;
//   }
//
// }
//
//
// @Injectable()
// export class CheckAuthentication implements CanActivate {
//
//   private userId: number | null | string = null;
//
//   constructor(private router: Router, private customLocalStore: customLocalStorage) {
//   }
//
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     this.userId = this.customLocalStore.getSessionStorage('userId');
//     console.log(this.userId)
//     if (this.userId !== null || this.userId !== '') {
//       this.router.navigate(['/home']);
//     }
//     return !!this.userId;
//   }
//
// }
//
