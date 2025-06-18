"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import Sidebar from "@/components/dashboard/sidebar"
import { Loader2 } from "lucide-react"
import Link from "next/link"

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
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 md:p-8">
        <nav className="mb-4 flex gap-4">
          <Link href="/dashboard/wardrobe">Гардероб</Link>
          <Link href="/dashboard/chat">Чат</Link>
          <Link href="/dashboard/waitlist">Waitlist</Link>
          <Link href="/dashboard/tryon">Try-On</Link>
        </nav>
        {children}
      </main>
    </div>
  )
}
