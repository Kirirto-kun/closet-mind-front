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
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"
import { MobileHeader } from "@/components/ui/mobile-header"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, isLoading, googleLogin } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await login(email, password)
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader title="Sign In" showNav={false} />
      
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
              <CardTitle className="text-2xl font-bold text-center">Welcome Back!</CardTitle>
              <CardDescription className="text-center text-base">
                Log in to access your ClosetMind AI assistant.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base">Email or Username</Label>
                  <Input
                    id="email"
                    type="text"
                    placeholder="you@example.com or your_username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                      Signing in...
                    </>
                  ) : (
                    "Log In"
                  )}
                </Button>
              </form>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="flex justify-center">
                <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
                  <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                      if (credentialResponse.credential) {
                        await googleLogin(credentialResponse.credential)
                      }
                    }}
                    onError={() => {
                      // Error handling
                    }}
                    useOneTap={false}
                    size="large"
                    width="100%"
                  />
                </GoogleOAuthProvider>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pt-6">
              <div className="text-sm text-center">
                <span className="text-muted-foreground">Don't have an account? </span>
                <Link href="/register" className="font-medium text-primary hover:underline">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}