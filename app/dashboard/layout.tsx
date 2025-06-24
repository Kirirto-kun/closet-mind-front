"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Loader2, Leaf } from "lucide-react"
import { MobileHeader } from "@/components/ui/mobile-header"
import Sidebar from "@/components/dashboard/sidebar"
import { cn } from "@/lib/utils"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const isChatPage = pathname === "/dashboard/chat"

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login")
    }
  }, [isAuthenticated, isLoading, router])
  
  useEffect(() => {
    const handleResize = () => {
      if (isChatPage && window.innerWidth < 768) {
        document.body.classList.add("overflow-hidden")
      } else {
        document.body.classList.remove("overflow-hidden")
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      document.body.classList.remove("overflow-hidden")
    }
  }, [isChatPage])

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

      <div className="md:flex md:h-screen">
        {/* Sidebar for Desktop */}
        <div className="hidden md:block w-80 flex-shrink-0 animate-fade-in-up">
          <Sidebar />
        </div>

        <div className="flex-1 flex flex-col">
      {/* Mobile Header */}
      <div className="md:hidden">
        <MobileHeader />
      </div>

          {/* Main Content Area */}
          <main className={cn(
            "flex-grow",
            isChatPage ? "md:h-screen" : "p-4 md:p-8"
          )}>
            <div className={cn(
              isChatPage ? "h-full" : "bg-card border border-border rounded-lg p-4 md:p-6 min-h-full shadow-sm"
            )}>
              {children}
            </div>
          </main>
          </div>
      </div>
    </div>
  )
}