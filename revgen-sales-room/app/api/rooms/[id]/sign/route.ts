import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { signatureData, signerName, signerTitle } = body

    // Get IP address
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown'

    // For now, return success - integrate with database later
    return NextResponse.json({
      id,
      status: 'SIGNED',
      signedAt: new Date().toISOString(),
      signerName,
      signerTitle,
      signedIpAddress: ip,
    })
  } catch (error) {
    console.error('Error signing room:', error)
    return NextResponse.json({ error: 'Failed to sign room' }, { status: 500 })
  }
}
