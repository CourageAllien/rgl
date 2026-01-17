import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { roomId, successUrl, cancelUrl } = body

    // Get room with package details
    const room = await prisma.salesRoom.findUnique({
      where: { id: roomId },
      include: {
        prospect: true,
        package: true,
      }
    })

    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 })
    }

    // Calculate price
    const price = room.customPrice || room.package?.price || 0
    const productName = room.package?.name || 'RevGen Labs Services'

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription', // or 'payment' for one-time
      customer_email: room.prospect.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: productName,
              description: `Monthly subscription for ${room.prospect.company}`,
            },
            unit_amount: price,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/r/${room.slug}?success=true`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/r/${room.slug}?canceled=true`,
      metadata: {
        roomId: room.id,
        prospectId: room.prospectId,
        company: room.prospect.company,
      },
    })

    // Update room with session ID
    await prisma.salesRoom.update({
      where: { id: roomId },
      data: { stripeSessionId: session.id }
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
