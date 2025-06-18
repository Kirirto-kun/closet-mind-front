"use client"
import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Loader2, User, Bot, Info, Sparkles } from "lucide-react"
import type { UIMessage, Chat } from "@/lib/types"
import { useAuth } from "@/contexts/auth-context"
import AgentMessageRenderer from "./agent-message-renderer"

interface ChatMessageAreaProps {
  selectedChat: Chat | null
  messages: UIMessage[]
  onSendMessage: (chatId: number, messageContent: string) => Promise<void>
  isLoadingMessages: boolean
  isSendingMessage: boolean
}

export default function ChatMessageArea({
  selectedChat,
  messages,
  onSendMessage,
  isLoadingMessages,
  isSendingMessage,
}: ChatMessageAreaProps) {
  const [input, setInput] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth() // For user avatar

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
  }, [messages, isLoadingMessages]) // Scroll on new messages or when loading finishes

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    if (!input.trim() || !selectedChat) return

    const messageContent = input
    setInput("") // Clear input immediately for better UX
    await onSendMessage(selectedChat.id, messageContent)
  }

  if (!selectedChat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-muted/30 to-background h-full">
        <div className="p-6 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 mb-6">
          <Sparkles className="h-12 w-12 text-primary" />
        </div>
        <div className="space-y-3 max-w-md">
          <h2 className="text-xl font-semibold">Добро пожаловать в ClosetMind</h2>
          <p className="text-muted-foreground">
            Выберите существующий разговор или создайте новый, чтобы начать общение с AI-стилистом
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg">
          <div className="p-4 rounded-lg border border-border/50 bg-card">
            <div className="text-2xl mb-2">🛍️</div>
            <h3 className="font-medium text-sm">Поиск товаров</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Найти одежду в интернет-магазинах
            </p>
          </div>
          <div className="p-4 rounded-lg border border-border/50 bg-card">
            <div className="text-2xl mb-2">👗</div>
            <h3 className="font-medium text-sm">Стильные образы</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Подбор нарядов из гардероба
            </p>
          </div>
          <div className="p-4 rounded-lg border border-border/50 bg-card">
            <div className="text-2xl mb-2">💬</div>
            <h3 className="font-medium text-sm">Модные советы</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Общие вопросы о стиле
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <header className="p-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-gradient-to-br from-primary/20 to-primary/10">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold truncate" title={selectedChat.title}>
                {selectedChat.title}
              </h2>
              <p className="text-xs text-muted-foreground">
                ClosetMind AI Assistant • Готов помочь с выбором одежды
              </p>
            </div>
          </div>
        </div>
      </header>
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        {isLoadingMessages && (
          <div className="flex flex-col justify-center items-center h-full space-y-4">
            <div className="p-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
            <div className="text-center">
              <p className="text-muted-foreground">Загружаю сообщения...</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Это займет всего секунду</p>
            </div>
          </div>
        )}
        {!isLoadingMessages && messages.length === 0 && (
          <div className="flex flex-col justify-center items-center h-full text-center space-y-6">
            <div className="p-6 rounded-full bg-gradient-to-br from-primary/20 to-primary/10">
              <Sparkles className="w-12 h-12 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Привет! Я ваш AI-стилист</h3>
              <p className="text-muted-foreground max-w-md">
                Могу помочь найти одежду, подобрать образ или просто поболтать о моде. 
                Задайте любой вопрос!
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
              <div className="p-3 rounded-lg border border-border/50 bg-muted/30">
                <h4 className="font-medium text-sm mb-1">🛍️ Поиск товаров</h4>
                <p className="text-xs text-muted-foreground">
                  "Найди черные джинсы"
                </p>
              </div>
              <div className="p-3 rounded-lg border border-border/50 bg-muted/30">
                <h4 className="font-medium text-sm mb-1">👗 Образы</h4>
                <p className="text-xs text-muted-foreground">
                  "Что надеть на работу?"
                </p>
              </div>
            </div>
          </div>
        )}
        {!isLoadingMessages && messages.length > 0 && (
          <div className="space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-start space-x-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                {msg.role === "assistant" && (
                  <Avatar className="h-9 w-9 border-2 border-primary/20">
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10">
                      <Sparkles size={20} className="text-primary" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div className={`flex-1 max-w-full ${msg.role === "user" ? "flex justify-end" : ""}`}>
                  {msg.role === "user" ? (
                    <div className="bg-primary text-primary-foreground p-4 rounded-2xl rounded-tr-md max-w-lg shadow-sm">
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </div>
                  ) : (
                    <div className="w-full">
                      <AgentMessageRenderer content={msg.content} />
                    </div>
                  )}
                </div>
                
                {msg.role === "user" && (
                  <Avatar className="h-9 w-9 border-2 border-muted">
                    <AvatarFallback className="bg-gradient-to-br from-muted to-background">
                      {user?.username?.[0]?.toUpperCase() || <User size={20} />}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            
            {/* Display a temporary "thinking" bubble for assistant if a user message was just sent */}
            {isSendingMessage && messages[messages.length - 1]?.role === "user" && (
              <div className="flex items-start space-x-3">
                <Avatar className="h-9 w-9 border-2 border-primary/20">
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10">
                    <Sparkles size={20} className="text-primary" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted p-4 rounded-2xl rounded-tl-md shadow-sm">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">Обрабатываю ваш запрос...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>
      <footer className="p-4 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <form onSubmit={handleSubmit} className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Спросите о товарах, образах или просто поболтайте..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isSendingMessage || isLoadingMessages}
              className="min-h-[2.5rem] px-4 py-3 pr-12 rounded-2xl border-2 focus:border-primary/50 transition-all duration-200"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit()
                }
              }}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              {input.length}/500
            </div>
          </div>
          <Button 
            type="submit" 
            disabled={isSendingMessage || isLoadingMessages || !input.trim()}
            className="h-10 w-10 rounded-full p-0 shadow-lg hover:shadow-xl transition-all duration-200"
            size="sm"
          >
            {isSendingMessage ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            <span className="sr-only">Отправить</span>
          </Button>
        </form>
        
        {/* Quick suggestions */}
        {messages.length === 0 && !isLoadingMessages && (
          <div className="mt-4 space-y-2">
            <p className="text-xs text-muted-foreground">Попробуйте спросить:</p>
            <div className="flex flex-wrap gap-2">
              {[
                "Найди мне черную футболку",
                "Что надеть на свидание?",
                "Подбери образ для работы",
                "Покажи зимние куртки"
              ].map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 rounded-full"
                  onClick={() => setInput(suggestion)}
                  disabled={isSendingMessage || isLoadingMessages}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}
      </footer>
    </div>
  )
}
