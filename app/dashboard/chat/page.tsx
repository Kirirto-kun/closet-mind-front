"use client"
import { useState, useEffect, useCallback } from "react"
import { apiCall } from "@/lib/api"
import type {
  Chat,
  ChatWithMessages,
  ChatMessageResponse,
  UIMessage,
  CreateChatPayload,
  SendMessagePayload,
} from "@/lib/types"
import ChatList from "@/components/dashboard/chat/chat-list"
import ChatMessageArea from "@/components/dashboard/chat/chat-message-area"
import { toast } from "sonner"

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([])
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [messages, setMessages] = useState<UIMessage[]>([])

  const [isLoadingChats, setIsLoadingChats] = useState(true)
  const [isCreatingChat, setIsCreatingChat] = useState(false)
  const [isDeletingChat, setIsDeletingChat] = useState<Set<number>>(new Set())
  const [isLoadingMessages, setIsLoadingMessages] = useState(false)
  const [isSendingMessage, setIsSendingMessage] = useState(false)

  const fetchChats = useCallback(async () => {
    setIsLoadingChats(true)
    try {
      const fetchedChats = await apiCall<Chat[]>("/api/v1/chats/")
      setChats(
        fetchedChats.sort(
          (a, b) => new Date(b.updated_at || b.created_at).getTime() - new Date(a.updated_at || a.created_at).getTime(),
        ),
      )
    } catch (error) {
      toast.error("Failed to load conversations.")
      console.error("Fetch chats error:", error)
    } finally {
      setIsLoadingChats(false)
    }
  }, [])

  useEffect(() => {
    fetchChats()
  }, [fetchChats])

  const handleSelectChat = useCallback(
    async (chatId: number) => {
      const chat = chats.find((c) => c.id === chatId)
      if (!chat) {
        console.warn(`Chat with ID ${chatId} not found in local list.`)
        return
      }

      setSelectedChat(chat)
      setIsLoadingMessages(true)
      setMessages([])
      try {
        console.log(`Fetching messages for chat ID: ${chatId}`)
        const chatDetails = await apiCall<ChatWithMessages>(`/api/v1/chats/${chatId}`)
        console.log("Fetched chat details with messages:", chatDetails)
        const uiMessages: UIMessage[] = (chatDetails.messages || [])
          .map((msg) => ({
            id: msg.id,
            content: msg.content,
            role: msg.role,
            createdAt: msg.created_at,
          }))
          .sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime())
        setMessages(uiMessages)
      } catch (error) {
        toast.error(`Failed to load messages for "${chat.title}".`)
        console.error(`Fetch messages error for chat ${chatId}:`, error)
        setSelectedChat(null)
      } finally {
        setIsLoadingMessages(false)
      }
    },
    [chats],
  )

  const handleCreateChat = async (title: string): Promise<Chat | null> => {
    setIsCreatingChat(true)
    try {
      const payload: CreateChatPayload = { title }
      console.log("Creating chat with payload:", payload)
      const newChat = await apiCall<Chat>("/api/v1/chats/", {
        method: "POST",
        body: JSON.stringify(payload),
      })
      console.log("Created new chat:", newChat)
      setChats((prev) =>
        [newChat, ...prev].sort(
          (a, b) => new Date(b.updated_at || b.created_at).getTime() - new Date(a.updated_at || a.created_at).getTime(),
        ),
      )
      toast.success(`Chat "${newChat.title}" created!`)
      return newChat
    } catch (error) {
      toast.error("Failed to create chat.")
      console.error("Create chat error:", error)
      return null
    } finally {
      setIsCreatingChat(false)
    }
  }

  const handleDeleteChat = async (chatId: number): Promise<boolean> => {
    setIsDeletingChat((prev) => new Set(prev).add(chatId))
    try {
      console.log(`Deleting chat ID: ${chatId}`)
      await apiCall<{ message: string }>(`/api/v1/chats/${chatId}`, {
        method: "DELETE",
      })
      console.log(`Chat ID: ${chatId} deleted successfully from API.`)
      setChats((prev) => prev.filter((c) => c.id !== chatId))
      if (selectedChat?.id === chatId) {
        setSelectedChat(null)
        setMessages([])
      }
      toast.success("Chat deleted successfully.")
      return true
    } catch (error) {
      toast.error("Failed to delete chat.")
      console.error(`Delete chat error for ID ${chatId}:`, error)
      return false
    } finally {
      setIsDeletingChat((prev) => {
        const newSet = new Set(prev)
        newSet.delete(chatId)
        return newSet
      })
    }
  }

  const handleSendMessage = async (chatId: number, messageContent: string) => {
    if (!selectedChat || selectedChat.id !== chatId) {
      console.warn("handleSendMessage called with mismatched chatId or no selected chat.")
      return
    }

    const optimisticUserMessage: UIMessage = {
      id: `optimistic-${Date.now()}`,
      role: "user",
      content: messageContent,
      createdAt: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, optimisticUserMessage])
    setIsSendingMessage(true)

    const endpoint = `/api/v1/chats/${chatId}/messages`
    const payload: SendMessagePayload = { message: messageContent }
    console.log(`Attempting to send message to ${endpoint} with payload:`, payload)

    try {
      const assistantResponse = await apiCall<ChatMessageResponse>(endpoint, {
        method: "POST",
        body: JSON.stringify(payload),
      })
      console.log("Received assistant response:", assistantResponse)

      const newAssistantMessage: UIMessage = {
        id: assistantResponse.id,
        role: assistantResponse.role,
        content: assistantResponse.content,
        createdAt: assistantResponse.created_at,
      }

      setMessages((prevMessages) => {
        // Remove optimistic message and add the confirmed user message (if API returned it) and assistant message
        // For simplicity, if your POST /messages doesn't return the user message, we keep the optimistic one.
        // And add the new assistant message.
        const updatedMessages = prevMessages.filter((m) => m.id !== optimisticUserMessage.id)
        // Assuming the user message is implicitly confirmed by the assistant's response.
        // If your API returns the created user message as well, you'd use that.
        return [...updatedMessages, optimisticUserMessage, newAssistantMessage].sort(
          (a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime(),
        )
      })

      setChats((prevChats) =>
        prevChats
          .map((c) =>
            c.id === chatId ? { ...c, updated_at: newAssistantMessage.createdAt || new Date().toISOString() } : c,
          )
          .sort(
            (a, b) =>
              new Date(b.updated_at || b.created_at).getTime() - new Date(a.updated_at || a.created_at).getTime(),
          ),
      )
    } catch (error) {
      // The error is already logged by apiCall
      // toast.error("Send message error: Failed to fetch"); // This was the original error, apiCall now handles more specific toasting
      console.error(`Send message error for chat ${chatId}:`, error) // Additional context

      // Revert optimistic update
      setMessages((prev) => prev.filter((m) => m.id !== optimisticUserMessage.id))
      // It might be good to restore the input field with messageContent here if input state was managed in this component
      // For now, ChatMessageArea clears its own input.
    } finally {
      setIsSendingMessage(false)
    }
  }

  useEffect(() => {
    if (!selectedChat && chats.length > 0 && !isLoadingChats && !isLoadingMessages) {
      // Check if the first chat is already selected to prevent infinite loop if selection fails
      if (chats[0] && selectedChat?.id !== chats[0].id) {
        handleSelectChat(chats[0].id)
      }
    }
  }, [chats, selectedChat, isLoadingChats, isLoadingMessages, handleSelectChat])

  return (
    <div className="flex h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] border border-border rounded-lg shadow-xl overflow-hidden">
      <ChatList
        chats={chats}
        selectedChatId={selectedChat?.id || null}
        onSelectChat={handleSelectChat}
        onCreateChat={handleCreateChat}
        onDeleteChat={handleDeleteChat}
        isLoadingChats={isLoadingChats}
        isCreatingChat={isCreatingChat}
        isDeletingChat={isDeletingChat}
      />
      <ChatMessageArea
        selectedChat={selectedChat}
        messages={messages}
        onSendMessage={handleSendMessage}
        isLoadingMessages={isLoadingMessages}
        isSendingMessage={isSendingMessage}
      />
    </div>
  )
}
