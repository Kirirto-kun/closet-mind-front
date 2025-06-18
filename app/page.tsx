"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Bot, MessageSquare, Shirt, ListChecks, Sparkles, Menu } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileHeader } from "@/components/ui/mobile-header"

const LandingNavbar = () => {
  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden">
        <MobileHeader title="ClosetMind AI" showNav={false} />
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Bot className="h-7 w-7 text-primary" />
            <span className="text-xl font-semibold">ClosetMind AI</span>
          </Link>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="ghost" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/register">
                Sign Up <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </nav>
    </>
  )
}

const LandingFooter = () => {
  return (
    <footer className="border-t border-border py-8 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} ClosetMind AI. All rights reserved.</p>
        <p className="text-sm mt-1">Your Personal AI Fashion Assistant.</p>
      </div>
    </footer>
  )
}

export default function LandingPage() {
  const features = [
    {
      icon: <MessageSquare className="h-8 w-8 md:h-10 md:w-10 text-primary mb-3 md:mb-4" />,
      title: "AI Powered Chat",
      description:
        "Get personalized style advice, outfit recommendations, and answers to your fashion queries from our intelligent AI assistant.",
    },
    {
      icon: <Shirt className="h-8 w-8 md:h-10 md:w-10 text-primary mb-3 md:mb-4" />,
      title: "Digital Wardrobe",
      description:
        "Organize your clothing items digitally. Easily view, manage, and get insights on how to best utilize your existing wardrobe.",
    },
    {
      icon: <ListChecks className="h-8 w-8 md:h-10 md:w-10 text-primary mb-3 md:mb-4" />,
      title: "Smart Waitlist",
      description:
        "Save fashion inspirations from anywhere. Upload screenshots or add URLs to your waitlist and let our AI help you decide.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <LandingNavbar />

      <main className="flex-grow pt-14 md:pt-16">
        {/* Hero Section */}
        <section className="py-12 md:py-20 lg:py-32 bg-gradient-to-b from-background to-background/90">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Sparkles className="h-10 w-10 md:h-12 md:w-12 text-primary mx-auto mb-4 animate-pulse" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Revolutionize Your Style with{" "}
              <span className="text-primary block sm:inline">ClosetMind AI</span>
            </h1>
            <p className="mt-4 md:mt-6 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              Your personal AI fashion assistant for smart wardrobe organization, personalized outfit recommendations,
              and effortless style discovery.
            </p>
            <div className="mt-8 md:mt-10 space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Button size="lg" asChild className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-3 md:py-6 h-12 md:h-auto">
                <Link href="/register">
                  Get Started For Free <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-3 md:py-6 h-12 md:h-auto">
                <Link href="/login">
                  Sign In
                </Link>
              </Button>
            </div>
            
            {/* Mobile-optimized mockup */}
            <div className="mt-12 md:mt-16 relative">
              <div className="aspect-[4/3] md:aspect-[16/9] max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-border bg-muted">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Bot className="h-16 w-16 md:h-24 md:w-24 text-primary mx-auto" />
                    <p className="text-muted-foreground text-sm md:text-base">
                      AI Fashion Assistant Interface
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-12 md:py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Why ClosetMind AI?</h2>
              <p className="mt-3 md:mt-4 max-w-xl mx-auto text-muted-foreground text-sm md:text-base">
                Unlock a smarter way to manage your style and make fashion effortless.
              </p>
            </div>
            <div className="grid gap-6 md:gap-8 md:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-card p-6 md:p-6 rounded-lg shadow-lg border border-border text-center hover:shadow-primary/20 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex justify-center">{feature.icon}</div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm md:text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-t from-background to-background/90">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Ready to Elevate Your Fashion Game?</h2>
            <p className="mt-3 md:mt-4 max-w-xl mx-auto text-muted-foreground text-sm md:text-base leading-relaxed">
              Join ClosetMind AI today and experience the future of personal styling. It's free to get started!
            </p>
            <div className="mt-6 md:mt-8 space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Button size="lg" asChild className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-3 md:py-6 h-12 md:h-auto">
                <Link href="/register">
                  Sign Up Now <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  )
}