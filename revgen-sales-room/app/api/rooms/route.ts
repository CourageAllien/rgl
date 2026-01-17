import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/rooms - List all rooms
export async function GET(request: NextRequest) {
  try {
    const rooms = await prisma.salesRoom.findMany({
      include: {
        prospect: true,
        package: true,
        _count: {
          select: { views: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(rooms)
  } catch (error) {
    console.error('Error fetching rooms:', error)
    return NextResponse.json({ error: 'Failed to fetch rooms' }, { status: 500 })
  }
}

// POST /api/rooms - Create a new room
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      // Prospect details
      contactName,
      contactEmail,
      contactPhone,
      company,
      website,
      industry,
      companySize,
      
      // Meeting details
      meetingDate,
      meetingNotes,
      meetingRecap,
      keyPoints,
      nextSteps,
      
      // Package
      packageId,
      customPrice,
      customFeatures,
      
      // Contract
      paymentTerms,
      startDate,
    } = body

    // Generate slug
    const slug = company
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + 
      '-' + new Date().toISOString().slice(0, 7).replace('-', '')

    // Create or find prospect
    let prospect = await prisma.prospect.findFirst({
      where: { email: contactEmail }
    })

    if (!prospect) {
      prospect = await prisma.prospect.create({
        data: {
          name: contactName,
          email: contactEmail,
          phone: contactPhone,
          company,
          website,
          industry,
          companySize,
        }
      })
    }

    // Fetch logo from Clearbit (optional - fail silently)
    let logoUrl = null
    if (website) {
      try {
        const domain = new URL(website).hostname
        logoUrl = `https://logo.clearbit.com/${domain}`
      } catch {}
    }

    if (logoUrl && !prospect.logoUrl) {
      await prisma.prospect.update({
        where: { id: prospect.id },
        data: { logoUrl }
      })
    }

    // Get package details
    let selectedPackage = null
    if (packageId) {
      selectedPackage = await prisma.package.findUnique({
        where: { id: packageId }
      })
    }

    // Create room
    const room = await prisma.salesRoom.create({
      data: {
        slug,
        prospectId: prospect.id,
        packageId: packageId || undefined,
        customPrice: customPrice ? parseInt(customPrice) * 100 : undefined,
        customFeatures,
        meetingDate: meetingDate ? new Date(meetingDate) : undefined,
        meetingNotes,
        meetingRecap,
        keyPoints: keyPoints?.filter(Boolean),
        nextSteps: nextSteps?.filter(Boolean),
        title: `${company} - RevGen Labs Proposal`,
        status: 'DRAFT',
      },
      include: {
        prospect: true,
        package: true,
      }
    })

    return NextResponse.json(room, { status: 201 })
  } catch (error) {
    console.error('Error creating room:', error)
    return NextResponse.json({ error: 'Failed to create room' }, { status: 500 })
  }
}
