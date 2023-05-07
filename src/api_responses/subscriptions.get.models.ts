export interface Subscription {
  id: number;
  productData: Object;
  priceData: Object;
}

export interface GetSubscriptionsAPIResponse {
  data: Array<Subscription>
}

interface StripeSubscription {
  id: string;
  object: string;
  application: null | string;
  applicationFeePercent: null | number;
  automaticTax: {
    enabled: boolean;
  };
  billingCycleAnchor: number;
  billingThresholds: null | {
    amountGte: number;
    resetBillingCycleAnchor: boolean;
  };
  cancelAt: null | number;
  cancelAtPeriodEnd: boolean;
  canceledAt: null | number;
  cancellationDetails: {
    comment: null | string;
    feedback: null | string;
    reason: null | string;
  };
  collectionMethod: string;
  created: number;
  currency: string;
  currentPeriodEnd: number;
  currentPeriodStart: number;
  customer: string;
  daysUntilDue: null | number;
  defaultPaymentMethod: null | string;
  defaultSource: null | string;
  defaultTaxRates: string[];
  description: null | string;
  discount: null | {
    coupon: {
      id: string;
    };
    customer: string;
    end: null | number;
    start: number;
    subscription: string;
  };
  endedAt: null | number;
  items: {
    object: string;
    data: {
      id: string;
      object: string;
      billingThresholds: null;
      created: number;
      metadata: Record<string, unknown>;
      price: {
        id: string;
        object: string;
        active: boolean;
        billingScheme: string;
        created: number;
        currency: string;
        customUnitAmount: null | number;
        livemode: boolean;
        lookupKey: null | string;
        metadata: Record<string, unknown>;
        nickname: null | string;
        product: string;
        recurring: {
          aggregateUsage: null | string;
          interval: string;
          intervalCount: number;
          usageType: string;
        };
        taxBehavior: string;
        tiersMode: null | string;
        transformQuantity: null;
        type: string;
        unitAmount: number;
        unitAmountDecimal: string;
      };
      quantity: number;
      subscription: string;
      taxRates: string[];
    }[];
    hasMore: boolean;
    url: string;
  };
  latestInvoice: string;
  livemode: boolean;
  metadata: Record<string, unknown>;
  nextPendingInvoiceItemInvoice: null | number;
  onBehalfOf: null | string;
  pauseCollection: null | {
    behavior: string;
    resumesAt: null | number;
  };
  paymentSettings: {
    paymentMethodOptions: null | {
      bancontact: {
        preferredLanguage: string;
      };
      card: {
        requestThreeDSecure: string;
      };
    };
    paymentMethodTypes: null | string[];
    saveDefaultPaymentMethod: string;
  };
  pendingInvoiceItemInterval: null | {
    interval: string;
    intervalCount: number;
  };
  pendingSetupIntent: null | string;
  pendingUpdate: null;
  schedule: null;
  startDate: number;
  status: string;
  testClock: null | number;
  transferData: null;
  trialEnd: null | number;
  trialSettings: {
    endBehavior: {
      missingPaymentMethod: string;
    };
  };
  trialStart: null | number;
}


interface PaymentIntent {
  id: string;
  object: string;
  amount: number;
  amountCapturable: number;
  amountDetails: {
    tip: Record<string, never>
  };
  amountReceived: number;
  application: string | null;
  applicationFeeAmount: number | null;
  automaticPaymentMethods: string[] | null;
  canceledAt: number | null;
  cancellationReason: string | null;
  captureMethod: string;
  clientSecret: string;
  confirmationMethod: string;
  created: number;
  currency: string;
  customer: string;
  description: string;
  invoice: string | null;
  lastPaymentError: Record<string, never> | null;
  latestCharge: string | null;
  livemode: boolean;
  metadata: Record<string, unknown>;
  nextAction: {
    type: string;
    useStripeSdk: {
      source: string;
      stripeJs: string;
      type: string;
    };
  } | null;
  onBehalfOf: string | null;
  paymentMethod: string | null;
  paymentMethodOptions: {
    acssDebit: {
      mandateOptions: {
        intervalDescription: string | null;
        paymentSchedule: string | null;
        transactionType: string | null;
      };
      verificationMethod: string;
    };
    card: {
      installments: number | null;
      mandateOptions: Record<string, never> | null;
      network: string | null;
      requestThreeDSecure: string;
    };
  };
  paymentMethodTypes: string[];
  processing: {
    acssDebit: {
      mandateAcceptance: {
        date: number;
        ip: string | null;
        offline: boolean | null;
        online: boolean | null;
        userAgent: string | null;
      };
    };
    card: {
      avsResult: null | string;
      cvcResult: null | string;
    };
  } | null;
  receiptEmail: string | null;
  review: string | null;
  setupFutureUsage: string;
  shipping: Record<string, unknown> | null;
  source: string;
  statementDescriptor: string | null;
  statementDescriptorSuffix: string | null;
  status: string;
  transferData: Record<string, unknown> | null;
  transferGroup: string | null;
}


export interface createSubscriptionAPIResponse {
  intent?: PaymentIntent,
  subscription?: StripeSubscription,
  subscriptionId: string,
  priceId: string,
  prodId: string,
  message: string
}


export interface validateSubscriptionAPIResponse {
  subscriptionValid: string
}


export interface verifySubscriptionAPIResponse {
  subscriptionStatus: boolean
}


export interface cancelSubscriptionAPIResponse {
  message: string
}
