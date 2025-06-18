"use client"
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { PlusCircle, MessageSquare, Trash2, Loader2 } from "lucide-react"
import type { Chat } from "@/lib/types"
import { toast } from "sonner"

interface ChatListProps {
  chats: Chat[]
  selectedChatId: number | null
  onSelectChat: (chatId: number) => void
  onCreateChat: (title: string) => Promise<Chat | null>
  onDeleteChat: (chatId: number) => Promise<boolean>
  isLoadingChats: boolean
  isCreatingChat: boolean
  isDeletingChat: Set<number> // Set of chat IDs currently being deleted
}

export default function ChatList({
  chats,
  selectedChatId,
  onSelectChat,
  onCreateChat,
  onDeleteChat,
  isLoadingChats,
  isCreatingChat,
  isDeletingChat,
}: ChatListProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newChatTitle, setNewChatTitle] = useState("")

  const handleCreateChat = async () => {
    if (!newChatTitle.trim()) {
      toast.error("Chat title cannot be empty.")
      return
    }
    const createdChat = await onCreateChat(newChatTitle)
    if (createdChat) {
      setNewChatTitle("")
      setIsCreateDialogOpen(false)
      onSelectChat(createdChat.id) // Automatically select the new chat
    }
  }

  const handleDelete = async (chatId: number, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent chat selection when clicking delete
    const confirmed = window.confirm("Are you sure you want to delete this chat and all its messages?")
    if (confirmed) {
      await onDeleteChat(chatId)
    }
  }

  return (
    <div className="w-full md:w-72 lg:w-80 border-r border-border flex flex-col bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30 h-full">
      <div className="p-4 border-b border-border flex justify-between items-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <h2 className="text-lg font-semibold">Разговоры</h2>
        <Button 
          size="icon" 
          variant="ghost" 
          onClick={() => setIsCreateDialogOpen(true)} 
          disabled={isCreatingChat}
          className="hover:bg-primary/10 hover:text-primary transition-colors"
        >
          {isCreatingChat ? <Loader2 className="h-5 w-5 animate-spin" /> : <PlusCircle className="h-5 w-5" />}
          <span className="sr-only">Новый чат</span>
        </Button>
      </div>
      <ScrollArea className="flex-1">
        {isLoadingChats && (
          <div className="p-4 text-center text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
            Загружаю чаты...
          </div>
        )}
        {!isLoadingChats && chats.length === 0 && (
          <div className="p-4 text-center text-muted-foreground space-y-3">
            <div className="p-3 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 w-fit mx-auto">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="mb-2">Пока нет разговоров</p>
              <Button variant="link" className="p-0 h-auto text-primary" onClick={() => setIsCreateDialogOpen(true)}>
                Создайте первый чат!
              </Button>
            </div>
          </div>
        )}
        {!isLoadingChats && chats.length > 0 && (
          <div className="p-2 space-y-1">
            {chats.map((chat) => (
              <Button
                key={chat.id}
                variant={selectedChatId === chat.id ? "secondary" : "ghost"}
                className="w-full justify-start h-auto py-2 px-3 group"
                onClick={() => onSelectChat(chat.id)}
              >
                <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate flex-1 text-left">{chat.title}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7 ml-2 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                  onClick={(e) => handleDelete(chat.id, e)}
                  disabled={isDeletingChat.has(chat.id)}
                >
                  {isDeletingChat.has(chat.id) ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4 text-destructive" />
                  )}
                  <span className="sr-only">Delete Chat</span>
                </Button>
              </Button>
            ))}
          </div>
        )}
      </ScrollArea>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Создать новый чат</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Введите название чата (например, Образы на выходные)"
              value={newChatTitle}
              onChange={(e) => setNewChatTitle(e.target.value)}
              disabled={isCreatingChat}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isCreatingChat}>
                Отмена
              </Button>
            </DialogClose>
            <Button onClick={handleCreateChat} disabled={isCreatingChat || !newChatTitle.trim()}>
              {isCreatingChat && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Создать чат
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
