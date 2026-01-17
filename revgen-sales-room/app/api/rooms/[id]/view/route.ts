import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { duration, pagesViewed, scrollDepth } = body

    // Get request metadata
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // For now, return success - integrate with database later
    return NextResponse.json({
      success: true,
      viewId: `view_${Date.now()}`,
      roomId: id,
      duration,
      pagesViewed,
      scrollDepth,
      ipAddress: ip,
      userAgent,
    })
  } catch (error) {
    console.error('Error tracking view:', error)
    return NextResponse.json({ error: 'Failed to track view' }, { status: 500 })
  }
}
