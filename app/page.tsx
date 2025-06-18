"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Bot, MessageSquare, Shirt, ListChecks, Sparkles } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle" // Import the new component

// Components for Landing Page Sections
const LandingNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Bot className="h-7 w-7 text-primary" />
          <span className="text-xl font-semibold">ClosetMind AI</span>
        </Link>
        <div className="flex items-center space-x-2">
          <ThemeToggle /> {/* Add the theme toggle here */}
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
      icon: <MessageSquare className="h-10 w-10 text-primary mb-4" />,
      title: "AI Powered Chat",
      description:
        "Get personalized style advice, outfit recommendations, and answers to your fashion queries from our intelligent AI assistant.",
    },
    {
      icon: <Shirt className="h-10 w-10 text-primary mb-4" />,
      title: "Digital Wardrobe",
      description:
        "Organize your clothing items digitally. Easily view, manage, and get insights on how to best utilize your existing wardrobe.",
    },
    {
      icon: <ListChecks className="h-10 w-10 text-primary mb-4" />,
      title: "Smart Waitlist",
      description:
        "Save fashion inspirations from anywhere. Upload screenshots or add URLs to your waitlist and let our AI help you decide.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <LandingNavbar />

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-background to-background/90">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Sparkles className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Revolutionize Your Style with <span className="text-primary">ClosetMind AI</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground">
              Your personal AI fashion assistant for smart wardrobe organization, personalized outfit recommendations,
              and effortless style discovery.
            </p>
            <div className="mt-10">
              <Button size="lg" asChild className="text-lg px-8 py-6">
                <Link href="/register">
                  Get Started For Free <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="mt-16 relative aspect-[16/9] max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-border">
              <Image
                src="/placeholder.svg?width=1200&height=675"
                alt="ClosetMind AI Interface Mockup"
                layout="fill"
                objectFit="cover"
                priority
              />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Why ClosetMind AI?</h2>
              <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
                Unlock a smarter way to manage your style and make fashion effortless.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-card p-6 rounded-lg shadow-lg border border-border text-center hover:shadow-primary/20 transition-shadow duration-300"
                >
                  {feature.icon}
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 md:py-24 bg-gradient-to-t from-background to-background/90">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Ready to Elevate Your Fashion Game?</h2>
            <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
              Join ClosetMind AI today and experience the future of personal styling. It's free to get started!
            </p>
            <div className="mt-8">
              <Button size="lg" asChild className="text-lg px-8 py-6">
                <Link href="/register">
                  Sign Up Now <ArrowRight className="ml-2 h-5 w-5" />
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
