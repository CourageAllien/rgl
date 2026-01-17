import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { signatureData, signerName, signerTitle } = body

    // Get IP address
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown'

    const room = await prisma.salesRoom.update({
      where: { id: params.id },
      data: {
        status: 'SIGNED',
        signedAt: new Date(),
        signatureData,
        signerName,
        signerTitle,
        signedIpAddress: ip,
      },
      include: {
        prospect: true,
        package: true,
      }
    })

    // Create notification
    await prisma.notification.create({
      data: {
        type: 'ROOM_SIGNED',
        roomId: room.id,
        channel: 'SLACK',
        metadata: {
          company: room.prospect.company,
          signerName,
          signedAt: new Date().toISOString(),
        }
      }
    })

    // TODO: Send Slack notification
    // TODO: Send email confirmation with signed PDF

    return NextResponse.json(room)
  } catch (error) {
    console.error('Error signing room:', error)
    return NextResponse.json({ error: 'Failed to sign room' }, { status: 500 })
  }
}
