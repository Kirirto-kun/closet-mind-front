import Cookies from "js-cookie"
import { toast } from "sonner"

const API_BASE_URL = "https://www.closetmind.studio"

interface ApiCallOptions extends RequestInit {
  isFormData?: boolean
}

export async function apiCall<T>(endpoint: string, options: ApiCallOptions = {}): Promise<T> {
  const token = Cookies.get("authToken")
  const headers: HeadersInit = options.isFormData
    ? {}
    : {
        "Content-Type": "application/json",
        ...options.headers,
      }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    let errorData
    try {
      errorData = await response.json()
    } catch (e) {
      // Not a JSON response
    }
    console.error(`API Error (${response.status}): ${endpoint}`, errorData || response.statusText)
    toast.error(`Error: ${errorData?.detail || errorData?.message || response.statusText || "Request failed"}`)
    throw new Error(errorData?.detail || `Request failed with status ${response.status}`)
  }

  if (response.headers.get("content-type")?.includes("application/zip")) {
    return response.blob() as unknown as T // For file downloads
  }

  if (response.status === 204 || response.headers.get("content-length") === "0") {
    return undefined as unknown as T // No content
  }

  return response.json() as Promise<T>
}
