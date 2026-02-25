import Stripe from "stripe";

/**
 * Lazy-initialized Stripe client.
 * Returns null if STRIPE_SECRET_KEY is not set (graceful degradation).
 */
function createStripeClient(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    console.warn("[stripe] STRIPE_SECRET_KEY not set — Stripe features disabled");
    return null;
  }
  return new Stripe(key, { apiVersion: "2024-06-20" as Stripe.LatestApiVersion });
}

let _stripe: Stripe | null | undefined;

export function getStripe(): Stripe | null {
  if (_stripe === undefined) {
    _stripe = createStripeClient();
  }
  return _stripe;
}
