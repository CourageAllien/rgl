'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  LayoutDashboard,
  FolderOpen,
  Plus,
  Settings,
  BarChart3,
  FileText,
  Sparkles,
  User,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'All Rooms', href: '/dashboard/rooms', icon: FolderOpen },
  { name: 'Create Room', href: '/dashboard/rooms/new', icon: Plus },
  { name: 'Templates', href: '/dashboard/templates', icon: FileText },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

function UserSection() {
  const [UserButton, setUserButton] = useState<React.ComponentType<{ afterSignOutUrl: string; appearance: Record<string, unknown> }> | null>(null)

  useEffect(() => {
    // Dynamically import Clerk's UserButton on the client side
    import('@clerk/nextjs').then((module) => {
      setUserButton(() => module.UserButton)
    }).catch(() => {
      // Clerk not available
    })
  }, [])

  if (!UserButton) {
    return (
      <div className="flex items-center gap-3 rounded-lg px-2 py-2 bg-zinc-900/50">
        <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center">
          <User className="w-5 h-5 text-zinc-500" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-zinc-200 truncate">Account</p>
          <p className="text-xs text-zinc-500 truncate">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3 rounded-lg px-2 py-2 bg-zinc-900/50">
      <UserButton
        afterSignOutUrl="/"
        appearance={{
          elements: {
            avatarBox: 'w-9 h-9',
          },
        }}
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-zinc-200 truncate">Account</p>
        <p className="text-xs text-zinc-500 truncate">Manage profile</p>
      </div>
    </div>
  )
}

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 flex flex-col border-r border-zinc-800 bg-zinc-950">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 px-6 border-b border-zinc-800">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/20">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <span className="font-bold text-lg text-white">RevGen</span>
          <span className="text-zinc-500 font-light"> Rooms</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== '/dashboard' && pathname.startsWith(item.href))

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-blue-500/10 text-blue-400'
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100'
              )}
            >
              <item.icon
                className={cn(
                  'h-5 w-5 transition-colors',
                  isActive ? 'text-blue-400' : 'text-zinc-500 group-hover:text-zinc-300'
                )}
              />
              {item.name}
              {item.name === 'Create Room' && (
                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded bg-blue-500/20 text-xs text-blue-400">
                  +
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-zinc-800">
        <UserSection />
      </div>
    </aside>
  )
}
