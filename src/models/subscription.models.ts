import {CardModel} from './card.models'

export class UserSubscription {
  public price_id: string;
  public prod_id: string;
  public cardDetails: CardModel


  constructor(prod_id?: string, price_id?: string, cardDetails?: CardModel) {
    this.price_id = price_id || '';
    this.prod_id = prod_id || '';
    this.cardDetails = cardDetails || new CardModel();
  }
}

export class UserSubscriptionCheck {
  public subscriptionId: string
  public priceId: string
  public prodId: string

  constructor(subscriptionId?: string, priceId?: string, prodId?: string) {
    this.subscriptionId = subscriptionId || '';
    this.priceId = priceId || ''
    this.prodId = prodId || ''
  }
}
