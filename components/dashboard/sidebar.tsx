"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { MessageSquare, Shirt, ListChecks, LogOut, Download, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle" // Import the new component

const API_BASE_URL = "https://www.closetmind.studio"

const navItems = [
  { href: "/dashboard/chat", label: "AI Chat", icon: MessageSquare },
  { href: "/dashboard/wardrobe", label: "My Wardrobe", icon: Shirt },
  { href: "/dashboard/waitlist", label: "My Waitlist", icon: ListChecks },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { logout, user } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
  }

  const handleDownloadExtension = () => {
    window.location.href = `${API_BASE_URL}/waitlist/download-extension`
  }

  return (
    <aside className="w-64 bg-card p-4 flex flex-col border-r border-border">
      <div className="mb-8 flex items-center space-x-2">
        <Bot className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-semibold">ClosetMind</h1>
      </div>
      <nav className="flex-grow space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === item.href
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "text-muted-foreground",
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto space-y-2">
        <Button
          variant="outline"
          className="w-full justify-start text-muted-foreground hover:text-accent-foreground"
          onClick={handleDownloadExtension}
        >
          <Download className="mr-3 h-5 w-5" />
          Download Extension
        </Button>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-accent-foreground"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Log Out
          </Button>
          <ThemeToggle /> {/* Add the theme toggle here */}
        </div>
        {user && (
          <p className="text-xs text-muted-foreground text-center mt-2">Logged in as {user.username || user.email}</p>
        )}
      </div>
    </aside>
  )
}
