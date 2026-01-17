'use client'

import { useState } from 'react'
import {
  TrendingUp,
  TrendingDown,
  Eye,
  FileSignature,
  DollarSign,
  Users,
  BarChart3,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Target,
} from 'lucide-react'

const overviewStats = [
  { 
    label: 'Total Views', 
    value: '1,247', 
    change: '+18.2%', 
    trend: 'up',
    icon: Eye, 
    color: '#22d3ee',
    description: 'vs last 30 days',
  },
  { 
    label: 'Conversion Rate', 
    value: '24.8%', 
    change: '+3.1%', 
    trend: 'up',
    icon: Target, 
    color: '#a78bfa',
    description: 'view to signed',
  },
  { 
    label: 'Signed Deals', 
    value: '18', 
    change: '+28.5%', 
    trend: 'up',
    icon: FileSignature, 
    color: '#34d399',
    description: 'this month',
  },
  { 
    label: 'Revenue', 
    value: '$47.5K', 
    change: '+42.3%', 
    trend: 'up',
    icon: DollarSign, 
    color: '#fbbf24',
    description: 'monthly recurring',
  },
]

const pipelineData = [
  { stage: 'Sent', count: 24, value: 119976, percent: 100, color: '#fbbf24' },
  { stage: 'Viewed', count: 18, value: 89982, percent: 75, color: '#22d3ee' },
  { stage: 'Engaged', count: 12, value: 59988, percent: 50, color: '#a78bfa' },
  { stage: 'Signed', count: 8, value: 39992, percent: 33, color: '#8b5cf6' },
  { stage: 'Paid', count: 6, value: 29994, percent: 25, color: '#34d399' },
]

const topRooms = [
  { company: 'TechScale Inc', views: 24, timeSpent: '12m 34s', conversion: 'Signed', value: 4999 },
  { company: 'DataFlow Systems', views: 18, timeSpent: '8m 12s', conversion: 'Paid', value: 2499 },
  { company: 'Elevate AI', views: 32, timeSpent: '15m 48s', conversion: 'Paid', value: 9999 },
  { company: 'ScaleUp Ventures', views: 8, timeSpent: '4m 22s', conversion: 'Viewing', value: 4999 },
  { company: 'CloudNine Solutions', views: 12, timeSpent: '6m 15s', conversion: 'Expired', value: 1999 },
]

const recentActivity = [
  { action: 'Room viewed', company: 'TechScale Inc', time: '2 min ago', icon: Eye },
  { action: 'Contract signed', company: 'DataFlow Systems', time: '1 hour ago', icon: FileSignature },
  { action: 'Payment received', company: 'Elevate AI', time: '3 hours ago', icon: DollarSign },
  { action: 'Room sent', company: 'ScaleUp Ventures', time: '5 hours ago', icon: Users },
  { action: 'Room viewed', company: 'CloudNine Solutions', time: '1 day ago', icon: Eye },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d')

  return (
    <div style={{ padding: '32px', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Analytics</h1>
          <p style={{ color: '#71717a', fontSize: '14px' }}>
            Track performance across all your sales rooms.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['7d', '30d', '90d', 'All'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer',
                background: timeRange === range ? 'rgba(34, 211, 238, 0.15)' : '#18181b',
                color: timeRange === range ? '#22d3ee' : '#a1a1aa',
              }}
            >
              {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : range === '90d' ? '90 Days' : 'All Time'}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {overviewStats.map((stat) => (
          <div key={stat.label} style={{
            padding: '24px',
            borderRadius: '12px',
            background: '#18181b',
            border: '1px solid #27272a',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ padding: '10px', borderRadius: '10px', background: `${stat.color}15` }}>
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px',
                padding: '4px 8px',
                borderRadius: '6px',
                background: stat.trend === 'up' ? 'rgba(52, 211, 153, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                color: stat.trend === 'up' ? '#34d399' : '#ef4444',
                fontSize: '12px',
                fontWeight: '500',
              }}>
                {stat.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.change}
              </div>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>{stat.value}</div>
            <div style={{ fontSize: '13px', color: '#71717a' }}>{stat.label}</div>
            <div style={{ fontSize: '11px', color: '#52525b', marginTop: '4px' }}>{stat.description}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Pipeline Funnel */}
        <div style={{
          padding: '24px',
          borderRadius: '12px',
          background: '#18181b',
          border: '1px solid #27272a',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <BarChart3 size={20} style={{ color: '#22d3ee' }} />
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'white' }}>Pipeline Funnel</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {pipelineData.map((stage, i) => (
              <div key={stage.stage}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: 'white' }}>{stage.stage}</span>
                    <span style={{ 
                      fontSize: '12px', 
                      color: '#71717a',
                      padding: '2px 6px',
                      background: '#27272a',
                      borderRadius: '4px',
                    }}>{stage.count} rooms</span>
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: stage.color }}>
                    ${(stage.value / 100).toLocaleString()}
                  </span>
                </div>
                <div style={{ position: 'relative' }}>
                  <div style={{ 
                    height: '8px', 
                    background: '#27272a', 
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}>
                    <div style={{ 
                      height: '100%', 
                      width: `${stage.percent}%`, 
                      background: stage.color,
                      borderRadius: '4px',
                      transition: 'width 0.5s ease',
                    }} />
                  </div>
                  {i < pipelineData.length - 1 && (
                    <div style={{
                      position: 'absolute',
                      right: `${100 - stage.percent}%`,
                      top: '12px',
                      fontSize: '10px',
                      color: '#52525b',
                      transform: 'translateX(50%)',
                    }}>
                      {Math.round((pipelineData[i + 1].count / stage.count) * 100)}%
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{
          padding: '24px',
          borderRadius: '12px',
          background: '#18181b',
          border: '1px solid #27272a',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <Clock size={20} style={{ color: '#a78bfa' }} />
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'white' }}>Recent Activity</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {recentActivity.map((activity, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: '#27272a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <activity.icon size={16} style={{ color: '#a1a1aa' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', color: 'white' }}>{activity.action}</div>
                  <div style={{ fontSize: '12px', color: '#71717a' }}>{activity.company}</div>
                </div>
                <div style={{ fontSize: '11px', color: '#52525b' }}>{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Rooms */}
      <div style={{
        padding: '24px',
        borderRadius: '12px',
        background: '#18181b',
        border: '1px solid #27272a',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
          <TrendingUp size={20} style={{ color: '#34d399' }} />
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'white' }}>Top Performing Rooms</h3>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
          gap: '16px',
          padding: '12px 16px',
          borderBottom: '1px solid #27272a',
          background: '#0f0f11',
          borderRadius: '8px 8px 0 0',
        }}>
          <div style={{ fontSize: '11px', fontWeight: '600', color: '#71717a', textTransform: 'uppercase' }}>Company</div>
          <div style={{ fontSize: '11px', fontWeight: '600', color: '#71717a', textTransform: 'uppercase' }}>Views</div>
          <div style={{ fontSize: '11px', fontWeight: '600', color: '#71717a', textTransform: 'uppercase' }}>Time Spent</div>
          <div style={{ fontSize: '11px', fontWeight: '600', color: '#71717a', textTransform: 'uppercase' }}>Status</div>
          <div style={{ fontSize: '11px', fontWeight: '600', color: '#71717a', textTransform: 'uppercase' }}>Value</div>
        </div>

        {topRooms.map((room, i) => (
          <div key={i} style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
            gap: '16px',
            padding: '16px',
            borderBottom: '1px solid #27272a',
            alignItems: 'center',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.2), rgba(168, 85, 247, 0.2))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '12px',
                color: 'white',
              }}>
                {room.company.charAt(0)}
              </div>
              <span style={{ fontSize: '14px', fontWeight: '500', color: 'white' }}>{room.company}</span>
            </div>
            <div style={{ fontSize: '14px', color: 'white' }}>{room.views}</div>
            <div style={{ fontSize: '14px', color: 'white' }}>{room.timeSpent}</div>
            <div>
              <span style={{
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: '500',
                color: room.conversion === 'Paid' ? '#34d399' : 
                       room.conversion === 'Signed' ? '#a78bfa' : 
                       room.conversion === 'Viewing' ? '#22d3ee' : '#ef4444',
                background: room.conversion === 'Paid' ? 'rgba(52, 211, 153, 0.15)' : 
                            room.conversion === 'Signed' ? 'rgba(167, 139, 250, 0.15)' : 
                            room.conversion === 'Viewing' ? 'rgba(34, 211, 238, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              }}>
                {room.conversion}
              </span>
            </div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#22d3ee' }}>
              ${(room.value / 100).toLocaleString()}/mo
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
