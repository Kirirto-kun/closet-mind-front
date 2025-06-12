"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Loader2, User, Bot } from "lucide-react"
import { apiCall } from "@/lib/api"
import type { ChatMessage, AgentResponse, AgentMessage } from "@/lib/types"
import { useAuth } from "@/contexts/auth-context" // To get user info for avatar

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollViewport = scrollAreaRef.current.querySelector("div[data-radix-scroll-area-viewport]")
      if (scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    if (!input.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const data: AgentMessage = { message: input }
      const response: AgentResponse = await apiCall("/api/v1/agent/chat", {
        method: "POST",
        body: JSON.stringify(data),
      })

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.response,
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Chat API error:", error)
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I couldn't process your request. Please try again.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] max-w-3xl mx-auto bg-card border border-border rounded-lg shadow-xl">
      <header className="p-4 border-b border-border">
        <h2 className="text-xl font-semibold">AI Fashion Assistant</h2>
      </header>
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-end space-x-2 ${msg.role === "user" ? "justify-end" : ""}`}>
              {msg.role === "assistant" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <Bot size={18} />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg ${
                  msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
              {msg.role === "user" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{user?.username?.[0]?.toUpperCase() || <User size={18} />}</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <div className="flex items-end space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  <Bot size={18} />
                </AvatarFallback>
              </Avatar>
              <div className="max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg bg-muted">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <footer className="p-4 border-t border-border">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          {/* File input for multimodal chat - if your API supports it later */}
          {/* <Button type="button" variant="ghost" size="icon" disabled={isLoading}>
            <Paperclip className="h-5 w-5" />
          </Button> */}
          <Input
            type="text"
            placeholder="Ask about outfits, trends, or your wardrobe..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="h-5 w-5" />}
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </footer>
    </div>
  )
}
