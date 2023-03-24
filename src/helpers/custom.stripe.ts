import {Inject, Injectable, InjectionToken} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class CustomStripe {
  public createTokenAPi = 'https://api.stripe.com/v1/tokens'

  constructor(private httpClient: HttpClient) {
  }

}
