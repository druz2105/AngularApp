export class UserRegister {

  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public confirmPassword?: string;


  constructor(firstName?: string, lastName?: string, email?: string, password?: string, confirmPassword?: string) {
    this.firstName = firstName || '';
    this.lastName = lastName || '';
    this.email = email || '';
    this.password = password || '';
    this.confirmPassword = confirmPassword || '';
  }

}

export class UserSubscription {
  public user_id: number;
  public price_id: string;
  public email: string;
  public cardDetails: CardModel


  constructor(user_id?: number, email?: string, price_id?: string, cardDetails?: CardModel) {
    this.user_id = user_id || 0;
    this.price_id = price_id || '';
    this.email = email || '';
    this.cardDetails = cardDetails || new CardModel();
  }
}


export class CardModel {
  public number: string;
  public exp_month: string;
  public exp_year: string;
  public cardExpire?: string;
  public cvc: string

  constructor(number?: string, confirmPassword?: string, cvc?: string, exp_month?: string, exp_year?: string) {
    this.number = number || '';
    this.cardExpire = confirmPassword || '';
    this.cvc = cvc || '';
    this.exp_month = exp_month || ''
    this.exp_year = exp_year || ''
  }
}

export class UserLogin {

  public email: string;
  public password: string;


  constructor(email?: string, password?: string) {
    this.email = email || '';
    this.password = password || '';
  }

}


export class UserDetail {
  public id: string | number;
  public email: string;
  public firstName: string;
  public lastName: string;
  public lastLogin: Date | null;

  constructor(id?: string | number, email?: string, firstName?: string, lastName?: string, lastLogin?: Date | null) {
    this.id = id || '';
    this.firstName = firstName || '';
    this.lastName = lastName || '';
    this.email = email || '';
    this.lastLogin = lastLogin || new Date();
  }
}


export class UserPasswordChange {
  public oldPassword: string;
  public password: string;

  public confirmPassword?: string;

  constructor(oldPassword?: string, password?: string, confirmPassword?: string) {
    this.oldPassword = oldPassword || '';
    this.password = password || '';
    this.confirmPassword = confirmPassword || '';
  }
}
