'use client'

import { useAuth } from '@/lib/auth-context'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Sidebar } from '@/components/dashboard/sidebar'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 lg:ml-64">
        <div className="p-6 pt-16 lg:pt-6">
          {children}
        </div>
      </main>
    </div>
  )
}