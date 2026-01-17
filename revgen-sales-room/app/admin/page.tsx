'use client'

import Link from 'next/link'
import {
  Plus,
  FolderOpen,
  Eye,
  FileSignature,
  DollarSign,
  TrendingUp,
  ArrowRight,
  Clock,
  ExternalLink,
  LayoutTemplate,
  Users,
  Package,
  BarChart3,
  Settings,
} from 'lucide-react'

const stats = [
  { name: 'Active Rooms', value: '12', change: '+3 this week', icon: FolderOpen, color: '#22d3ee' },
  { name: 'Total Views', value: '248', change: '+18% vs last month', icon: Eye, color: '#a78bfa' },
  { name: 'Signed', value: '8', change: '67% conversion', icon: FileSignature, color: '#34d399' },
  { name: 'Revenue', value: '$47.5K', change: '+$12.5K this month', icon: DollarSign, color: '#fbbf24' },
]

const recentRooms = [
  { id: '1', slug: 'techscale-jan2026', company: 'TechScale Inc', contact: 'Alex Thompson', status: 'VIEWED', color: '#22d3ee', amount: 4999, lastActivity: '2 hours ago' },
  { id: '2', slug: 'dataflow-jan2026', company: 'DataFlow Systems', contact: 'Sarah Chen', status: 'SIGNED', color: '#a78bfa', amount: 2499, lastActivity: '5 hours ago' },
  { id: '3', slug: 'elevate-jan2026', company: 'Elevate AI', contact: 'Marcus Johnson', status: 'PAID', color: '#34d399', amount: 9999, lastActivity: '1 day ago' },
  { id: '4', slug: 'scaleup-jan2026', company: 'ScaleUp Ventures', contact: 'Emily Rodriguez', status: 'SENT', color: '#fbbf24', amount: 4999, lastActivity: '2 days ago' },
]

const quickActions = [
  { href: '/admin/rooms/new', icon: Plus, label: 'Create New Room', desc: 'Start a new sales room', color: '#22d3ee' },
  { href: '/admin/templates', icon: LayoutTemplate, label: 'Use Template', desc: 'Start from a template', color: '#a78bfa' },
  { href: '/admin/prospects', icon: Users, label: 'Add Prospect', desc: 'Add a new contact', color: '#34d399' },
  { href: '/admin/analytics', icon: BarChart3, label: 'View Analytics', desc: 'Track performance', color: '#fbbf24' },
]

const pipeline = [
  { status: 'Sent', count: 8, percent: 100, color: '#fbbf24' },
  { status: 'Viewed', count: 6, percent: 75, color: '#22d3ee' },
  { status: 'Signed', count: 4, percent: 50, color: '#a78bfa' },
  { status: 'Paid', count: 3, percent: 38, color: '#34d399' },
]

export default function AdminDashboard() {
  return (
    <div style={{ padding: '32px', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Dashboard</h1>
          <p style={{ color: '#71717a', fontSize: '14px' }}>
            Welcome back! Here's your sales room overview.
          </p>
        </div>
        <Link href="/admin/rooms/new">
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #22d3ee, #06b6d4)',
            color: 'black',
            fontWeight: '600',
            fontSize: '14px',
            border: 'none',
            cursor: 'pointer',
          }}>
            <Plus size={18} />
            Create Room
          </button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {stats.map((stat) => (
          <div
            key={stat.name}
            style={{
              padding: '24px',
              borderRadius: '16px',
              background: '#18181b',
              border: '1px solid #27272a',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{
                padding: '12px',
                borderRadius: '12px',
                background: `${stat.color}15`,
              }}>
                <stat.icon size={22} style={{ color: stat.color }} />
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '12px',
                color: '#34d399',
              }}>
                <TrendingUp size={12} />
                {stat.change.split(' ')[0]}
              </div>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '13px', color: '#71717a' }}>{stat.name}</div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px' }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Recent Rooms */}
          <div style={{
            background: '#18181b',
            border: '1px solid #27272a',
            borderRadius: '16px',
            overflow: 'hidden',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px 24px',
              borderBottom: '1px solid #27272a',
            }}>
              <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'white' }}>Recent Rooms</h2>
              <Link href="/admin/rooms" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#22d3ee', textDecoration: 'none' }}>
                View all <ArrowRight size={14} />
              </Link>
            </div>
            
            <div>
              {recentRooms.map((room, i) => (
                <Link key={room.id} href={`/admin/rooms/${room.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 24px',
                    borderBottom: i < recentRooms.length - 1 ? '1px solid #27272a' : 'none',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#1f1f23'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.15), rgba(168, 85, 247, 0.15))',
                        border: '1px solid #3f3f46',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '15px',
                        color: 'white',
                      }}>
                        {room.company.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '500', color: 'white' }}>{room.company}</div>
                        <div style={{ fontSize: '12px', color: '#71717a' }}>{room.contact}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: 'white' }}>${(room.amount / 100).toFixed(0)}/mo</div>
                        <div style={{ fontSize: '11px', color: '#52525b', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                          <Clock size={10} />
                          {room.lastActivity}
                        </div>
                      </div>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '600',
                        color: room.color,
                        background: `${room.color}15`,
                        border: `1px solid ${room.color}30`,
                      }}>
                        {room.status}
                      </span>
                      <Link href={`/r/${room.slug}`} target="_blank" onClick={(e) => e.stopPropagation()}>
                        <div style={{ padding: '8px', borderRadius: '6px', background: '#27272a', cursor: 'pointer' }}>
                          <ExternalLink size={14} style={{ color: '#a1a1aa' }} />
                        </div>
                      </Link>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
          }}>
            {quickActions.map((action) => (
              <Link key={action.href} href={action.href} style={{ textDecoration: 'none' }}>
                <div style={{
                  padding: '20px',
                  borderRadius: '12px',
                  background: '#18181b',
                  border: '1px solid #27272a',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#3f3f46'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#27272a'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      background: `${action.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <action.icon size={20} style={{ color: action.color }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: 'white', marginBottom: '2px' }}>{action.label}</div>
                      <div style={{ fontSize: '12px', color: '#71717a' }}>{action.desc}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Pipeline Card */}
          <div style={{
            padding: '24px',
            borderRadius: '16px',
            background: '#18181b',
            border: '1px solid #27272a',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'white' }}>Sales Pipeline</h2>
              <Link href="/admin/analytics" style={{ fontSize: '12px', color: '#22d3ee', textDecoration: 'none' }}>
                Details →
              </Link>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {pipeline.map((stage, i) => (
                <div key={stage.status}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: stage.color }} />
                      <span style={{ fontSize: '13px', color: '#a1a1aa' }}>{stage.status}</span>
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: 'white' }}>{stage.count}</span>
                  </div>
                  <div style={{ height: '6px', background: '#27272a', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ 
                      height: '100%', 
                      width: `${stage.percent}%`, 
                      background: stage.color,
                      borderRadius: '3px',
                      transition: 'width 0.5s ease',
                    }} />
                  </div>
                  {i < pipeline.length - 1 && (
                    <div style={{ fontSize: '10px', color: '#52525b', textAlign: 'right', marginTop: '4px' }}>
                      {Math.round((pipeline[i + 1].count / stage.count) * 100)}% conversion
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div style={{
            padding: '24px',
            borderRadius: '16px',
            background: '#18181b',
            border: '1px solid #27272a',
            flex: 1,
          }}>
            <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'white', marginBottom: '20px' }}>Recent Activity</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { action: 'Room viewed', company: 'TechScale Inc', time: '2 min ago', icon: Eye, color: '#22d3ee' },
                { action: 'Contract signed', company: 'DataFlow Systems', time: '1 hour ago', icon: FileSignature, color: '#a78bfa' },
                { action: 'Payment received', company: 'Elevate AI', time: '3 hours ago', icon: DollarSign, color: '#34d399' },
                { action: 'Room sent', company: 'ScaleUp Ventures', time: '5 hours ago', icon: FolderOpen, color: '#fbbf24' },
              ].map((activity, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: `${activity.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <activity.icon size={14} style={{ color: activity.color }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', color: 'white' }}>{activity.action}</div>
                    <div style={{ fontSize: '11px', color: '#71717a' }}>{activity.company}</div>
                  </div>
                  <div style={{ fontSize: '11px', color: '#52525b' }}>{activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
