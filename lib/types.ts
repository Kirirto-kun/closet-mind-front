export interface UserResponse {
  id: number
  email: string
  username: string
  is_active: boolean
  created_at: string
  updated_at?: string | null
}

export interface Token {
  access_token: string
  token_type: "bearer"
}

export interface AgentMessage {
  message: string
}

export interface AgentResponse {
  response: string
}

export interface ClothingItemCreate {
  name: string
  image_url: string
  features?: Record<string, any>
}

export interface ClothingItemResponse extends ClothingItemCreate {
  id: number
  user_id: number
}

export interface WaitListItemCreate {
  image_url: string
  status?: string
}

export interface WaitListItemResponse extends WaitListItemCreate {
  id: number
  user_id: number
  created_at: string
}

export interface WaitListScreenshotUpload {
  image_base64: string // "data:image/png;base64,AAAA…"
}

// For chat messages display
export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
}
