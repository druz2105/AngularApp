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
  application_fee_percent: null | number;
  automatic_tax: {
    enabled: boolean;
  };
  billing_cycle_anchor: number;
  billing_thresholds: null | {
    amount_gte: number;
    reset_billing_cycle_anchor: boolean;
  };
  cancel_at: null | number;
  cancel_at_period_end: boolean;
  canceled_at: null | number;
  cancellation_details: {
    comment: null | string;
    feedback: null | string;
    reason: null | string;
  };
  collection_method: string;
  created: number;
  currency: string;
  current_period_end: number;
  current_period_start: number;
  customer: string;
  days_until_due: null | number;
  default_payment_method: null | string;
  default_source: null | string;
  default_tax_rates: string[];
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
  ended_at: null | number;
  items: {
    object: string;
    data: {
      id: string;
      object: string;
      billing_thresholds: null;
      created: number;
      metadata: Record<string, unknown>;
      price: {
        id: string;
        object: string;
        active: boolean;
        billing_scheme: string;
        created: number;
        currency: string;
        custom_unit_amount: null | number;
        livemode: boolean;
        lookup_key: null | string;
        metadata: Record<string, unknown>;
        nickname: null | string;
        product: string;
        recurring: {
          aggregate_usage: null | string;
          interval: string;
          interval_count: number;
          usage_type: string;
        };
        tax_behavior: string;
        tiers_mode: null | string;
        transform_quantity: null;
        type: string;
        unit_amount: number;
        unit_amount_decimal: string;
      };
      quantity: number;
      subscription: string;
      tax_rates: string[];
    }[];
    has_more: boolean;
    url: string;
  };
  latest_invoice: string;
  livemode: boolean;
  metadata: Record<string, unknown>;
  next_pending_invoice_item_invoice: null | number;
  on_behalf_of: null | string;
  pause_collection: null | {
    behavior: string;
    resumes_at: null | number;
  };
  payment_settings: {
    payment_method_options: null | {
      bancontact: {
        preferred_language: string;
      };
      card: {
        request_three_d_secure: string;
      };
    };
    payment_method_types: null | string[];
    save_default_payment_method: string;
  };
  pending_invoice_item_interval: null | {
    interval: string;
    interval_count: number;
  };
  pending_setup_intent: null | string;
  pending_update: null;
  schedule: null;
  start_date: number;
  status: string;
  test_clock: null | number;
  transfer_data: null;
  trial_end: null | number;
  trial_settings: {
    end_behavior: {
      missing_payment_method: string;
    };
  };
  trial_start: null | number;
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
}
