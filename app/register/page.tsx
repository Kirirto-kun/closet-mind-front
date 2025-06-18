"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Loader2, ArrowLeft } from "lucide-react"
import { MobileHeader } from "@/components/ui/mobile-header"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { register, isLoading } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await register(email, username, password)
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader title="Sign Up" showNav={false} />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)] px-4 py-8">
        <div className="w-full max-w-md space-y-6">
          {/* Back to home link - mobile friendly */}
          <div className="flex items-center">
            <Button variant="ghost" size="sm" asChild className="p-0 h-auto">
              <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to home
              </Link>
            </Button>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
              <CardDescription className="text-center text-base">
                Join ClosetMind AI and revolutionize your style.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting || isLoading}
                    className="h-12 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-base">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="your_username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={isSubmitting || isLoading}
                    className="h-12 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-base">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isSubmitting || isLoading}
                    className="h-12 text-base"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-medium" 
                  disabled={isSubmitting || isLoading}
                >
                  {isSubmitting || isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pt-6">
              <div className="text-sm text-center">
                <span className="text-muted-foreground">Already have an account? </span>
                <Link href="/login" className="font-medium text-primary hover:underline">
                  Log in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}