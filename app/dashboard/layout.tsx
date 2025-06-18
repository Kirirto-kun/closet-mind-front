"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Loader2 } from "lucide-react"
import { MobileHeader } from "@/components/ui/mobile-header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, isLoading, token } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="md:hidden">
        <MobileHeader />
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex h-screen bg-background text-foreground">
        {/* Desktop Sidebar - keep existing sidebar for desktop */}
        <aside className="w-64 bg-card p-4 flex flex-col border-r border-border">
          {/* Existing sidebar content */}
        </aside>
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <main className="pt-14 min-h-[calc(100vh-3.5rem)]">
          <div className="p-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}