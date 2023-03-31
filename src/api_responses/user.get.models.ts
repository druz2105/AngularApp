export interface LoginAPIResponse {

  userId: number;
  access: string;
  refresh: string;
  firstName: string;
  lastName: string;
  email: string;
  subscriptionStatus: string;
}

export interface RegisterAPIResponse {
  "id": number
  "email": string,
  "firstName": string,
  "lastName": string,
}

export interface GetUserDetailAPIResponse {
  "id": number
  "email": string,
  "firstName": string,
  "lastName": string,
  "lastLogin": Date | null
  "image": string
}

export interface StripeDetailsAPIResponse {
  cardDetails: {
    last4: string;
    expMonth: number;
    expYear: number;
    cardId: string;
  };
  subscription: {
    subId: string;
    currentPeriodStart: number;
    currentPeriodEnd: number;
    status: string;
  };
  product: {
    prodId: string;
    name: string;
  };
  price: {
    priceId: string;
    currency: string;
    unitAmount: number;
    recurring: {
      aggregateUsage: null | string;
      interval: string;
      intervalCount: number;
      trialPeriodDays: number;
      usageType: string;
    };
  };
}
