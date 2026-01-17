import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { duration, pagesViewed, scrollDepth } = body

    // Get request metadata
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const referrer = request.headers.get('referer') || undefined

    // Create view record
    const view = await prisma.roomView.create({
      data: {
        roomId: params.id,
        duration,
        pagesViewed,
        scrollDepth,
        ipAddress: ip,
        userAgent,
        referrer,
      }
    })

    // Update room status if first view
    const room = await prisma.salesRoom.findUnique({
      where: { id: params.id }
    })

    if (room && room.status === 'SENT') {
      await prisma.salesRoom.update({
        where: { id: params.id },
        data: {
          status: 'VIEWED',
          viewedAt: new Date(),
        }
      })

      // Create notification for first view
      await prisma.notification.create({
        data: {
          type: 'ROOM_VIEWED',
          roomId: params.id,
          channel: 'SLACK',
          metadata: {
            firstView: true,
            ipAddress: ip,
          }
        }
      })
    }

    return NextResponse.json({ success: true, viewId: view.id })
  } catch (error) {
    console.error('Error tracking view:', error)
    return NextResponse.json({ error: 'Failed to track view' }, { status: 500 })
  }
}
