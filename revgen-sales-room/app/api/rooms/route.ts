import { NextRequest, NextResponse } from 'next/server'

// GET /api/rooms - List all rooms
export async function GET() {
  try {
    // For now, return empty array - integrate with database later
    return NextResponse.json([])
  } catch (error) {
    console.error('Error fetching rooms:', error)
    return NextResponse.json({ error: 'Failed to fetch rooms' }, { status: 500 })
  }
}

// POST /api/rooms - Create new room
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Generate slug
    const slug = `${body.company?.toLowerCase().replace(/[^a-z0-9]/g, '')}-${Date.now()}`
    
    // For now, return created room - integrate with database later
    return NextResponse.json({
      id: `room_${Date.now()}`,
      slug,
      status: 'DRAFT',
      createdAt: new Date().toISOString(),
      ...body
    })
  } catch (error) {
    console.error('Error creating room:', error)
    return NextResponse.json({ error: 'Failed to create room' }, { status: 500 })
  }
}
