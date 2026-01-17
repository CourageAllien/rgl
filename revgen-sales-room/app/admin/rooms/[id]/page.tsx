'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ExternalLink,
  Copy,
  Send,
  Eye,
  FileSignature,
  DollarSign,
  Clock,
  CheckCircle2,
  Mail,
  Phone,
  Building2,
  Globe,
  MoreVertical,
  Edit,
  Trash2,
  RefreshCw,
  Calendar,
  TrendingUp,
  Users,
} from 'lucide-react'

// Mock room data
const mockRoom = {
  id: '1',
  slug: 'techscale-jan2026',
  status: 'VIEWED',
  statusColor: '#22d3ee',
  createdAt: '2026-01-14T10:30:00Z',
  lastViewed: '2 hours ago',
  views: 12,
  timeSpent: '8m 34s',
  
  prospect: {
    name: 'Alex Thompson',
    email: 'alex@techscale.com',
    phone: '+1 (415) 555-0123',
    company: 'TechScale Inc',
    website: 'techscale.com',
    industry: 'B2B SaaS',
    companySize: '50-100 employees',
  },
  
  package: {
    name: 'Growth Package',
    price: 4999,
    color: '#a78bfa',
  },

  timeline: [
    { action: 'Room created', time: '2026-01-14 10:30 AM', icon: Calendar },
    { action: 'Room sent to prospect', time: '2026-01-14 10:35 AM', icon: Send },
    { action: 'First view', time: '2026-01-14 11:42 AM', icon: Eye },
    { action: 'Viewed proposal section', time: '2026-01-14 11:45 AM', icon: Eye },
    { action: 'Last activity', time: '2 hours ago', icon: Clock },
  ],
}

export default function RoomDetailPage({ params }: { params: { id: string } }) {
  const [copied, setCopied] = useState(false)
  const room = mockRoom

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/r/${room.slug}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ padding: '32px', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/admin/rooms">
            <button style={{
              padding: '10px',
              borderRadius: '8px',
              background: '#18181b',
              border: '1px solid #27272a',
              color: '#a1a1aa',
              cursor: 'pointer',
            }}>
              <ArrowLeft size={18} />
            </button>
          </Link>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>{room.prospect.company}</h1>
              <span style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: '600',
                color: room.statusColor,
                background: `${room.statusColor}15`,
                border: `1px solid ${room.statusColor}30`,
              }}>
                {room.status}
              </span>
            </div>
            <p style={{ fontSize: '13px', color: '#71717a' }}>
              Created on {new Date(room.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={copyLink}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              borderRadius: '8px',
              background: '#18181b',
              border: '1px solid #27272a',
              color: copied ? '#34d399' : '#a1a1aa',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
            }}
          >
            {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
          <Link href={`/r/${room.slug}`} target="_blank">
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #22d3ee, #06b6d4)',
              color: 'black',
              fontSize: '13px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
            }}>
              <ExternalLink size={16} />
              View Room
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Total Views', value: room.views, icon: Eye, color: '#22d3ee' },
          { label: 'Time Spent', value: room.timeSpent, icon: Clock, color: '#a78bfa' },
          { label: 'Last Viewed', value: room.lastViewed, icon: TrendingUp, color: '#fbbf24' },
          { label: 'Package Value', value: `$${(room.package.price / 100).toFixed(0)}/mo`, icon: DollarSign, color: '#34d399' },
        ].map((stat) => (
          <div key={stat.label} style={{
            padding: '20px',
            borderRadius: '12px',
            background: '#18181b',
            border: '1px solid #27272a',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ padding: '8px', borderRadius: '8px', background: `${stat.color}15` }}>
                <stat.icon size={16} style={{ color: stat.color }} />
              </div>
              <span style={{ fontSize: '12px', color: '#71717a' }}>{stat.label}</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '24px' }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Prospect Info */}
          <div style={{
            padding: '24px',
            borderRadius: '16px',
            background: '#18181b',
            border: '1px solid #27272a',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'white' }}>Prospect Information</h2>
              <button style={{
                padding: '8px',
                borderRadius: '6px',
                background: 'transparent',
                border: '1px solid #27272a',
                color: '#a1a1aa',
                cursor: 'pointer',
              }}>
                <Edit size={14} />
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '20px',
                color: 'white',
              }}>
                {room.prospect.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div style={{ fontSize: '18px', fontWeight: '600', color: 'white' }}>{room.prospect.name}</div>
                <div style={{ fontSize: '14px', color: '#71717a' }}>{room.prospect.company}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { icon: Mail, label: 'Email', value: room.prospect.email },
                { icon: Phone, label: 'Phone', value: room.prospect.phone },
                { icon: Globe, label: 'Website', value: room.prospect.website },
                { icon: Building2, label: 'Industry', value: room.prospect.industry },
                { icon: Users, label: 'Company Size', value: room.prospect.companySize },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ padding: '8px', borderRadius: '6px', background: '#27272a' }}>
                    <item.icon size={14} style={{ color: '#71717a' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#52525b' }}>{item.label}</div>
                    <div style={{ fontSize: '13px', color: 'white' }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Package Info */}
          <div style={{
            padding: '24px',
            borderRadius: '16px',
            background: '#18181b',
            border: '1px solid #27272a',
          }}>
            <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'white', marginBottom: '20px' }}>Package Details</h2>
            
            <div style={{
              padding: '20px',
              borderRadius: '12px',
              background: `${room.package.color}10`,
              border: `1px solid ${room.package.color}30`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: '600', color: 'white', marginBottom: '4px' }}>{room.package.name}</div>
                  <div style={{ fontSize: '13px', color: '#71717a' }}>Monthly subscription</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', color: room.package.color }}>
                    ${(room.package.price / 100).toFixed(0)}
                  </div>
                  <div style={{ fontSize: '13px', color: '#71717a' }}>per month</div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{
            padding: '24px',
            borderRadius: '16px',
            background: '#18181b',
            border: '1px solid #27272a',
          }}>
            <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'white', marginBottom: '20px' }}>Actions</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '14px',
                borderRadius: '10px',
                background: '#27272a',
                border: 'none',
                color: 'white',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
              }}>
                <Send size={16} />
                Resend Email
              </button>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '14px',
                borderRadius: '10px',
                background: '#27272a',
                border: 'none',
                color: 'white',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
              }}>
                <RefreshCw size={16} />
                Regenerate Link
              </button>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '14px',
                borderRadius: '10px',
                background: '#27272a',
                border: 'none',
                color: 'white',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
              }}>
                <Edit size={16} />
                Edit Room
              </button>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '14px',
                borderRadius: '10px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                color: '#ef4444',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
              }}>
                <Trash2 size={16} />
                Delete Room
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Timeline */}
        <div style={{
          padding: '24px',
          borderRadius: '16px',
          background: '#18181b',
          border: '1px solid #27272a',
          height: 'fit-content',
        }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'white', marginBottom: '24px' }}>Activity Timeline</h2>
          
          <div style={{ position: 'relative' }}>
            {/* Timeline line */}
            <div style={{
              position: 'absolute',
              left: '15px',
              top: '20px',
              bottom: '20px',
              width: '2px',
              background: '#27272a',
            }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {room.timeline.map((event, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', position: 'relative' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#27272a',
                    border: '2px solid #18181b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1,
                  }}>
                    <event.icon size={14} style={{ color: '#a1a1aa' }} />
                  </div>
                  <div style={{ flex: 1, paddingTop: '4px' }}>
                    <div style={{ fontSize: '14px', color: 'white', marginBottom: '2px' }}>{event.action}</div>
                    <div style={{ fontSize: '12px', color: '#52525b' }}>{event.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
