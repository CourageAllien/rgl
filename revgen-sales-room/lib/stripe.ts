import Stripe from 'stripe'

// Initialize Stripe client only if API key is available
export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-12-15.clover',
      typescript: true,
    })
  : null

export async function createCheckoutSession({
  roomId,
  roomSlug,
  amount,
  productName,
  customerEmail,
}: {
  roomId: string
  roomSlug: string
  amount: number // in cents
  productName: string
  customerEmail: string
}) {
  if (!stripe) {
    throw new Error('Stripe is not configured')
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: productName,
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/r/${roomSlug}?payment=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/r/${roomSlug}?payment=cancelled`,
    customer_email: customerEmail,
    metadata: {
      roomId,
      roomSlug,
    },
  })

  return session
}
