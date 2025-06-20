"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import type { UserResponse, Token } from "@/lib/types" // We'll define these types later
import { toast } from "sonner" // Using sonner for toasts

const API_BASE_URL = "http://localhost:8000"

interface AuthContextType {
  user: UserResponse | null
  token: string | null
  login: (email_or_username: string, password: string) => Promise<boolean>
  register: (email: string, username: string, password: string) => Promise<boolean>
  googleLogin: (id_token: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserResponse | null>(null)
  const [token, setToken] = useState<string | null>(Cookies.get("authToken") || null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const fetchUser = useCallback(async (currentToken: string) => {
    // You might need an endpoint like /auth/me to get user details with a token
    // For now, we'll assume login/register returns user details or we store them.
    // This is a placeholder. If your /auth/token returns user details, adapt this.
    // Or, if you store user details from register/login response in localStorage/cookie.
    // For simplicity, we'll set user to a placeholder if token exists.
    // A proper implementation would verify the token and fetch user data.
    if (currentToken) {
      // Try to get user from localStorage if stored during login/register
      const storedUser = localStorage.getItem("authUser")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      } else {
        // If no /auth/me endpoint, this part is tricky without storing user details
        // For now, let's assume a minimal user object if token exists
        // This is NOT secure for real applications without token validation
        // setUser({ id: 0, email: 'User', username: 'User', is_active: true, created_at: '', updated_at: '' });
      }
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const currentToken = Cookies.get("authToken")
    if (currentToken) {
      setToken(currentToken)
      fetchUser(currentToken)
    } else {
      setIsLoading(false)
    }
  }, [fetchUser])

  const login = async (email_or_username: string, password: string) => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      params.append("username", email_or_username)
      params.append("password", password)

      const response = await fetch(`${API_BASE_URL}/auth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      })

      if (!response.ok) {
        const errorData = await response.json()
        toast.error(`Login failed: ${errorData.detail || response.statusText}`)
        setIsLoading(false)
        return false
      }

      const data: Token = await response.json()
      Cookies.set("authToken", data.access_token, { expires: 365, secure: process.env.NODE_ENV === "production" })
      setToken(data.access_token)

      // Assuming you need to fetch user details separately or they are part of a different flow
      // For now, we'll simulate fetching/setting user.
      // A /auth/me endpoint would be ideal here.
      // Let's assume for now that we don't have user details directly from /auth/token
      // We'll set a placeholder or leave it null.
      // A better approach: after login, redirect and fetch user details on dashboard.
      // Or, if register returns user, store it.
      // For this example, we'll just set token and let protected routes handle it.
      // To make it more complete, let's assume we need to fetch user data after login.
      // This is a simplified version.
      // setUser({ id: 0, email: email_or_username, username: email_or_username, is_active: true, created_at: '', updated_at: '' }); // Placeholder
      // localStorage.setItem('authUser', JSON.stringify({ email: email_or_username, username: email_or_username }));

      toast.success("Login successful!")
      setIsLoading(false)
      router.push("/dashboard")
      return true
    } catch (error) {
      console.error("Login error:", error)
      toast.error("Login failed. Please try again.")
      setIsLoading(false)
      return false
    }
  }

  const register = async (email: string, username: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        toast.error(`Registration failed: ${errorData.detail?.[0]?.msg || response.statusText}`)
        setIsLoading(false)
        return false
      }

      const data: UserResponse = await response.json()
      // setUser(data); // User data from registration
      // localStorage.setItem('authUser', JSON.stringify(data)); // Store user data
      toast.success("Registration successful! Please log in.")
      setIsLoading(false)
      router.push("/login")
      return true
    } catch (error) {
      console.error("Registration error:", error)
      toast.error("Registration failed. Please try again.")
      setIsLoading(false)
      return false
    }
  }

  const googleLogin = async (id_token: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/auth/google-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_token }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        toast.error(`Google login failed: ${errorData.detail || response.statusText}`)
        setIsLoading(false)
        return false
      }

      const data: Token = await response.json()
      Cookies.set("authToken", data.access_token, { expires: 365, secure: process.env.NODE_ENV === "production" })
      setToken(data.access_token)
      toast.success("Google login successful!")
      setIsLoading(false)
      router.push("/dashboard")
      return true
    } catch (error) {
      console.error("Google login error:", error)
      toast.error("Google login failed. Please try again.")
      setIsLoading(false)
      return false
    }
  }

  const logout = () => {
    Cookies.remove("authToken")
    localStorage.removeItem("authUser")
    setToken(null)
    setUser(null)
    router.push("/login")
    toast.info("Logged out successfully.")
  }

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, googleLogin, logout, isLoading, isAuthenticated: !!token && !isLoading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
