import { AdminSidebar } from '@/components/admin/sidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ minHeight: '100vh', background: '#09090b' }}>
      <AdminSidebar />
      <main style={{ marginLeft: '240px', minHeight: '100vh', background: '#09090b' }}>
        {children}
      </main>
    </div>
  )
}
