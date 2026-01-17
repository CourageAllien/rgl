'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Copy,
  Trash2,
  ExternalLink,
  Calendar,
  DollarSign,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  Send,
  FileSignature,
  AlertCircle,
} from 'lucide-react'

const rooms = [
  { 
    id: '1', 
    slug: 'techscale-jan2026',
    company: 'TechScale Inc', 
    contact: 'Alex Thompson',
    email: 'alex@techscale.com',
    package: 'Growth Package',
    amount: 4999,
    status: 'VIEWED',
    views: 12,
    lastViewed: '2 hours ago',
    createdAt: '2026-01-14',
    expiresAt: '2026-02-14',
  },
  { 
    id: '2', 
    slug: 'dataflow-jan2026',
    company: 'DataFlow Systems', 
    contact: 'Sarah Chen',
    email: 'sarah@dataflow.io',
    package: 'Starter Package',
    amount: 2499,
    status: 'SIGNED',
    views: 8,
    lastViewed: '5 hours ago',
    createdAt: '2026-01-12',
    expiresAt: '2026-02-12',
  },
  { 
    id: '3', 
    slug: 'elevate-jan2026',
    company: 'Elevate AI', 
    contact: 'Marcus Johnson',
    email: 'marcus@elevateai.com',
    package: 'Enterprise Package',
    amount: 9999,
    status: 'PAID',
    views: 24,
    lastViewed: '1 day ago',
    createdAt: '2026-01-10',
    expiresAt: '2026-02-10',
  },
  { 
    id: '4', 
    slug: 'scaleup-jan2026',
    company: 'ScaleUp Ventures', 
    contact: 'Emily Rodriguez',
    email: 'emily@scaleupvc.com',
    package: 'Growth Package',
    amount: 4999,
    status: 'SENT',
    views: 0,
    lastViewed: 'Never',
    createdAt: '2026-01-16',
    expiresAt: '2026-02-16',
  },
  { 
    id: '5', 
    slug: 'cloudnine-dec2025',
    company: 'CloudNine Solutions', 
    contact: 'David Park',
    email: 'david@cloudnine.io',
    package: 'Pilot Program',
    amount: 1999,
    status: 'EXPIRED',
    views: 3,
    lastViewed: '2 weeks ago',
    createdAt: '2025-12-01',
    expiresAt: '2026-01-01',
  },
]

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'PAID': return { color: '#34d399', bg: 'rgba(52, 211, 153, 0.15)', icon: CheckCircle2, label: 'Paid' }
    case 'SIGNED': return { color: '#a78bfa', bg: 'rgba(167, 139, 250, 0.15)', icon: FileSignature, label: 'Signed' }
    case 'VIEWED': return { color: '#22d3ee', bg: 'rgba(34, 211, 238, 0.15)', icon: Eye, label: 'Viewed' }
    case 'SENT': return { color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.15)', icon: Send, label: 'Sent' }
    case 'DRAFT': return { color: '#71717a', bg: 'rgba(113, 113, 122, 0.15)', icon: Clock, label: 'Draft' }
    case 'EXPIRED': return { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)', icon: AlertCircle, label: 'Expired' }
    default: return { color: '#71717a', bg: 'rgba(113, 113, 122, 0.15)', icon: Clock, label: status }
  }
}

const filters = ['All', 'Sent', 'Viewed', 'Signed', 'Paid', 'Expired']

export default function RoomsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         room.contact.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = selectedFilter === 'All' || room.status === selectedFilter.toUpperCase()
    return matchesSearch && matchesFilter
  })

  return (
    <div style={{ padding: '32px', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>All Rooms</h1>
          <p style={{ color: '#71717a', fontSize: '14px' }}>
            Manage and track all your sales rooms in one place.
          </p>
        </div>
        <Link href="/admin/rooms/new">
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #22d3ee, #06b6d4)',
            color: 'black',
            fontWeight: '600',
            fontSize: '14px',
            border: 'none',
            cursor: 'pointer',
          }}>
            <Plus size={16} />
            Create Room
          </button>
        </Link>
      </div>

      {/* Search & Filters */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {/* Search */}
        <div style={{ 
          flex: 1, 
          minWidth: '300px',
          position: 'relative',
        }}>
          <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#71717a' }} />
          <input
            type="text"
            placeholder="Search by company or contact..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 12px 12px 44px',
              borderRadius: '10px',
              background: '#18181b',
              border: '1px solid #27272a',
              color: 'white',
              fontSize: '14px',
              outline: 'none',
            }}
          />
        </div>

        {/* Status Filters */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              style={{
                padding: '10px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer',
                background: selectedFilter === filter ? 'rgba(34, 211, 238, 0.15)' : '#18181b',
                color: selectedFilter === filter ? '#22d3ee' : '#a1a1aa',
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(5, 1fr)', 
        gap: '12px', 
        marginBottom: '24px',
      }}>
        {[
          { label: 'Total', count: rooms.length, color: '#a1a1aa' },
          { label: 'Sent', count: rooms.filter(r => r.status === 'SENT').length, color: '#fbbf24' },
          { label: 'Viewed', count: rooms.filter(r => r.status === 'VIEWED').length, color: '#22d3ee' },
          { label: 'Signed', count: rooms.filter(r => r.status === 'SIGNED').length, color: '#a78bfa' },
          { label: 'Paid', count: rooms.filter(r => r.status === 'PAID').length, color: '#34d399' },
        ].map((stat) => (
          <div key={stat.label} style={{
            padding: '16px',
            borderRadius: '10px',
            background: '#18181b',
            border: '1px solid #27272a',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: stat.color }}>{stat.count}</div>
            <div style={{ fontSize: '12px', color: '#71717a' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Rooms Table */}
      <div style={{
        background: '#18181b',
        border: '1px solid #27272a',
        borderRadius: '12px',
        overflow: 'hidden',
      }}>
        {/* Table Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr 80px',
          gap: '16px',
          padding: '14px 20px',
          borderBottom: '1px solid #27272a',
          background: '#0f0f11',
        }}>
          <div style={{ fontSize: '12px', fontWeight: '600', color: '#71717a', textTransform: 'uppercase' }}>Company</div>
          <div style={{ fontSize: '12px', fontWeight: '600', color: '#71717a', textTransform: 'uppercase' }}>Package</div>
          <div style={{ fontSize: '12px', fontWeight: '600', color: '#71717a', textTransform: 'uppercase' }}>Status</div>
          <div style={{ fontSize: '12px', fontWeight: '600', color: '#71717a', textTransform: 'uppercase' }}>Views</div>
          <div style={{ fontSize: '12px', fontWeight: '600', color: '#71717a', textTransform: 'uppercase' }}>Value</div>
          <div></div>
        </div>

        {/* Table Body */}
        {filteredRooms.map((room) => {
          const statusConfig = getStatusConfig(room.status)
          return (
            <div 
              key={room.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr 80px',
                gap: '16px',
                padding: '16px 20px',
                borderBottom: '1px solid #27272a',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#1f1f23'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              {/* Company */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.2), rgba(168, 85, 247, 0.2))',
                  border: '1px solid #3f3f46',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  color: 'white',
                }}>
                  {room.company.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: '500', color: 'white', fontSize: '14px' }}>{room.company}</div>
                  <div style={{ fontSize: '12px', color: '#71717a' }}>{room.contact}</div>
                </div>
              </div>

              {/* Package */}
              <div>
                <div style={{ fontSize: '14px', color: 'white' }}>{room.package}</div>
                <div style={{ fontSize: '12px', color: '#52525b' }}>Created {room.createdAt}</div>
              </div>

              {/* Status */}
              <div>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '500',
                  color: statusConfig.color,
                  background: statusConfig.bg,
                }}>
                  <statusConfig.icon size={12} />
                  {statusConfig.label}
                </span>
              </div>

              {/* Views */}
              <div>
                <div style={{ fontSize: '14px', color: 'white' }}>{room.views} views</div>
                <div style={{ fontSize: '12px', color: '#52525b' }}>{room.lastViewed}</div>
              </div>

              {/* Value */}
              <div style={{ fontSize: '15px', fontWeight: '600', color: '#22d3ee' }}>
                ${(room.amount / 100).toLocaleString()}/mo
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <Link href={`/r/${room.slug}`} target="_blank">
                  <button style={{
                    padding: '8px',
                    borderRadius: '6px',
                    background: 'transparent',
                    border: '1px solid #27272a',
                    color: '#a1a1aa',
                    cursor: 'pointer',
                  }}>
                    <ExternalLink size={14} />
                  </button>
                </Link>
                <button 
                  onClick={() => navigator.clipboard.writeText(`${window.location.origin}/r/${room.slug}`)}
                  style={{
                    padding: '8px',
                    borderRadius: '6px',
                    background: 'transparent',
                    border: '1px solid #27272a',
                    color: '#a1a1aa',
                    cursor: 'pointer',
                  }}
                >
                  <Copy size={14} />
                </button>
              </div>
            </div>
          )
        })}

        {filteredRooms.length === 0 && (
          <div style={{ padding: '60px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '14px', color: '#71717a', marginBottom: '8px' }}>No rooms found</div>
            <Link href="/admin/rooms/new">
              <button style={{
                padding: '10px 20px',
                borderRadius: '8px',
                background: 'rgba(34, 211, 238, 0.15)',
                color: '#22d3ee',
                fontSize: '14px',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer',
              }}>
                Create your first room
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
