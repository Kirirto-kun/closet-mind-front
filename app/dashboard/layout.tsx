"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Loader2, Leaf } from "lucide-react"
import { MobileHeader } from "@/components/ui/mobile-header"
import Sidebar from "@/components/dashboard/sidebar"

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
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4 animate-fade-in-up">
          <div className="relative">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse-gentle"></div>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Leaf className="h-4 w-4 text-forest-500 animate-leaf-dance" />
            <p className="text-muted-foreground">Загружаем ваш стильный мир...</p>
            <Leaf className="h-4 w-4 text-forest-500 animate-leaf-dance" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Декоративные элементы только для светлой темы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none dark:hidden">
        <div className="absolute top-10 right-20 animate-float">
          <Leaf className="h-5 w-5 text-forest-300 opacity-40" />
        </div>
        <div className="absolute bottom-20 left-10 animate-leaf-dance" style={{ animationDelay: '1s' }}>
          <Leaf className="h-4 w-4 text-forest-400 opacity-30" />
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden">
        <MobileHeader />
      </div>

      {/* Desktop Layout - сайдбар на всю левую часть */}
      <div className="hidden md:flex h-screen bg-background text-foreground">
        {/* Desktop Sidebar - занимает всю левую часть */}
        <div className="w-80 flex-shrink-0 animate-fade-in-up">
          <Sidebar />
        </div>
        {/* Основной контент */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="bg-card border border-border rounded-lg p-6 min-h-full shadow-sm">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <main className="pt-14 min-h-[calc(100vh-3.5rem)] bg-background">
          <div className="p-4">
            <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}