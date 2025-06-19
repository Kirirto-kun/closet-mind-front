"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Bot, MessageSquare, Shirt, ListChecks, Sparkles, Menu, Leaf } from "lucide-react"
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
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Bot className="h-7 w-7 text-primary transition-transform group-hover:scale-110" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-forest-500 rounded-full animate-pulse-gentle"></div>
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-primary to-forest-600 bg-clip-text text-transparent">
              ClosetMind AI
            </span>
          </Link>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="ghost" asChild className="hover:bg-accent/50 transition-all duration-300">
              <Link href="/login">Войти</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-primary to-forest-500 hover:from-primary/90 hover:to-forest-500/90 shadow-lg hover:shadow-primary/25 transition-all duration-300">
              <Link href="/register">
                Начать <ArrowRight className="ml-2 h-4 w-4" />
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
    <footer className="border-t border-border/50 py-8 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
        <div className="flex justify-center items-center space-x-2 mb-2">
          <Leaf className="h-4 w-4 text-forest-500 animate-leaf-dance" />
          <p>&copy; {new Date().getFullYear()} ClosetMind AI. Все права защищены.</p>
          <Leaf className="h-4 w-4 text-forest-500 animate-leaf-dance" style={{ animationDelay: '1s' }} />
        </div>
        <p className="text-sm">Ваш персональный AI помощник по стилю.</p>
      </div>
    </footer>
  )
}

// Декоративный компонент с листьями
const FloatingLeaves = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 animate-float">
        <Leaf className="h-6 w-6 text-forest-500 opacity-60" />
      </div>
      <div className="absolute top-32 right-20 animate-leaf-dance" style={{ animationDelay: '0.5s' }}>
        <Leaf className="h-4 w-4 text-forest-400 opacity-40" />
      </div>
      <div className="absolute top-60 left-1/4 animate-float" style={{ animationDelay: '1s' }}>
        <Leaf className="h-5 w-5 text-forest-500 opacity-50" />
      </div>
      <div className="absolute bottom-40 right-1/3 animate-leaf-dance" style={{ animationDelay: '1.5s' }}>
        <Leaf className="h-4 w-4 text-forest-400 opacity-60" />
      </div>
      <div className="absolute bottom-60 left-16 animate-float" style={{ animationDelay: '2s' }}>
        <Leaf className="h-6 w-6 text-forest-500 opacity-30" />
      </div>
    </div>
  )
}

export default function LandingPage() {
  const features = [
    {
      icon: <MessageSquare className="h-8 w-8 md:h-10 md:w-10 text-primary mb-3 md:mb-4" />,
      title: "AI Чат-помощник",
      description:
        "Получайте персональные советы по стилю, рекомендации нарядов и ответы на модные вопросы от нашего умного AI ассистента.",
    },
    {
      icon: <Shirt className="h-8 w-8 md:h-10 md:w-10 text-primary mb-3 md:mb-4" />,
      title: "Цифровой гардероб",
      description:
        "Организуйте свою одежду в цифровом формате. Легко просматривайте, управляйте и получайте советы по лучшему использованию гардероба.",
    },
    {
      icon: <ListChecks className="h-8 w-8 md:h-10 md:w-10 text-primary mb-3 md:mb-4" />,
      title: "Умный список желаний",
      description:
        "Сохраняйте модные идеи откуда угодно. Загружайте скриншоты или добавляйте ссылки в список и позволяйте AI помочь с выбором.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground relative">
      <FloatingLeaves />
      <LandingNavbar />

      <main className="flex-grow pt-14 md:pt-16 relative z-10">
        {/* Hero Section */}
        <section className="py-12 md:py-20 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 dots-pattern opacity-30"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="animate-fade-in-up">
              <div className="relative inline-block">
                <Sparkles className="h-10 w-10 md:h-12 md:w-12 text-primary mx-auto mb-4 animate-gentle-bounce" />
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse-gentle"></div>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
                Революция стиля с{" "}
                <span className="text-primary block sm:inline bg-gradient-to-r from-primary to-forest-600 bg-clip-text text-transparent">
                  ClosetMind AI
                </span>
              </h1>
              <p className="mt-4 md:mt-6 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                Ваш персональный AI помощник по моде для умной организации гардероба, персональных рекомендаций нарядов
                и легкого открытия стиля.
              </p>
            </div>
            
            <div className="mt-8 md:mt-10 space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Button size="lg" asChild className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-3 md:py-6 h-12 md:h-auto bg-gradient-to-r from-primary to-forest-500 hover:from-primary/90 hover:to-forest-500/90 shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105">
                <Link href="/register">
                  Начать бесплатно <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-3 md:py-6 h-12 md:h-auto border-primary/30 hover:bg-primary/5 transition-all duration-300 hover:scale-105">
                <Link href="/login">
                  Войти
                </Link>
              </Button>
            </div>
            
            {/* Mobile-optimized mockup */}
            <div className="mt-12 md:mt-16 relative animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <div className="aspect-[4/3] md:aspect-[16/9] max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-border/50 bg-card/80 backdrop-blur-sm card-nature">
                <div className="w-full h-full flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-forest-300/5"></div>
                  <div className="text-center space-y-4 relative z-10">
                    <div className="relative">
                      <Bot className="h-16 w-16 md:h-24 md:w-24 text-primary mx-auto animate-gentle-bounce" />
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse-gentle"></div>
                    </div>
                    <p className="text-muted-foreground text-sm md:text-base">
                      Интерфейс AI Fashion помощника
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-12 md:py-16 lg:py-24 bg-card/30 backdrop-blur-sm relative">
          <div className="absolute inset-0 leaf-pattern opacity-20"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-8 md:mb-12 lg:mb-16 animate-fade-in-up">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Почему ClosetMind AI?</h2>
              <p className="mt-3 md:mt-4 max-w-xl mx-auto text-muted-foreground text-sm md:text-base">
                Откройте умный способ управления стилем и сделайте моду простой.
              </p>
            </div>
            <div className="grid gap-6 md:gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="card-nature p-6 md:p-6 rounded-lg shadow-lg border border-border/50 text-center hover:shadow-primary/20 transition-all duration-300 hover:scale-105 hover:-translate-y-2 animate-fade-in-up group"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <div className="flex justify-center group-hover:animate-gentle-bounce">{feature.icon}</div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm md:text-sm leading-relaxed">{feature.description}</p>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Leaf className="h-4 w-4 text-forest-500 animate-leaf-dance" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-forest-100/30 relative">
          <div className="absolute inset-0 dots-pattern opacity-20"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="animate-fade-in-up">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Готовы улучшить свою модную игру?</h2>
              <p className="mt-3 md:mt-4 max-w-xl mx-auto text-muted-foreground text-sm md:text-base leading-relaxed">
                Присоединяйтесь к ClosetMind AI уже сегодня и испытайте будущее персонального стиля. Начните бесплатно!
              </p>
            </div>
            <div className="mt-6 md:mt-8 space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Button size="lg" asChild className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-3 md:py-6 h-12 md:h-auto bg-gradient-to-r from-primary to-forest-500 hover:from-primary/90 hover:to-forest-500/90 shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105">
                <Link href="/register">
                  Зарегистрироваться <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
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