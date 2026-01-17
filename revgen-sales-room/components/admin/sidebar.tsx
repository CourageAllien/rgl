'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FolderOpen,
  Plus,
  FileText,
  Settings,
  BarChart3,
  Sparkles,
  Users,
  Package,
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'All Rooms', href: '/admin/rooms', icon: FolderOpen },
  { name: 'Create Room', href: '/admin/rooms/new', icon: Plus },
  { name: 'Templates', href: '/admin/templates', icon: FileText, isNew: true },
  { name: 'Prospects', href: '/admin/prospects', icon: Users },
  { name: 'Packages', href: '/admin/packages', icon: Package },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside style={{
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      width: '240px',
      display: 'flex',
      flexDirection: 'column',
      background: '#09090b',
      borderRight: '1px solid #27272a',
      zIndex: 50,
    }}>
      {/* Logo */}
      <div style={{
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '0 20px',
        borderBottom: '1px solid #27272a',
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(34, 211, 238, 0.2)',
        }}>
          <Sparkles size={18} color="white" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
            <span style={{ fontWeight: 'bold', color: 'white' }}>RevGen</span>
            <span style={{ fontWeight: 'bold', color: '#22d3ee' }}>Labs</span>
          </div>
          <span style={{ fontSize: '10px', color: '#71717a' }}>Sales Room Admin</span>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navigation.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/admin' && pathname.startsWith(item.href))

            return (
              <Link
                key={item.name}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  background: isActive ? 'rgba(34, 211, 238, 0.1)' : 'transparent',
                  color: isActive ? '#22d3ee' : '#a1a1aa',
                }}
              >
                <item.icon size={18} style={{ color: isActive ? '#22d3ee' : '#71717a' }} />
                <span>{item.name}</span>
                {(item.name === 'Create Room' || (item as any).isNew) && (
                  <span style={{
                    marginLeft: 'auto',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: 'rgba(34, 211, 238, 0.2)',
                    color: '#22d3ee',
                  }}>
                    NEW
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      <div style={{ padding: '12px', borderTop: '1px solid #27272a' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '10px 12px',
          borderRadius: '8px',
          background: '#18181b',
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '12px',
          }}>
            RL
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '14px', fontWeight: '500', color: 'white', margin: 0 }}>RevGen Labs</p>
            <p style={{ fontSize: '12px', color: '#71717a', margin: 0 }}>Admin</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
