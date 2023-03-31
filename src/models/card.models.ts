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
