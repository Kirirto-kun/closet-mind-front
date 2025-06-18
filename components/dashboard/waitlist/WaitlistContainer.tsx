"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, AlertTriangle, ImageUp, ListChecks } from "lucide-react"
import { getWaitlistItems } from "@/lib/api"
import type { WaitlistItem } from "@/lib/api"
import UploadScreenshotDialog from "./UploadScreenshotDialog"
import WaitlistItemCard from "./WaitlistItemCard"

export default function WaitlistContainer() {
  const [items, setItems] = useState<WaitlistItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)

  const fetchItems = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getWaitlistItems()
      setItems(data)
    } catch (err) {
      setError("Failed to fetch waitlist items. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const handleItemAdded = () => {
    fetchItems() // Refresh list after adding new item
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">My Items</h2>
        <Button onClick={() => setIsUploadDialogOpen(true)}>
          <ImageUp className="mr-2 h-5 w-5" /> Upload Screenshot
        </Button>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="ml-3 text-lg">Loading your waitlist...</p>
        </div>
      )}

      {!isLoading && error && (
        <div className="flex flex-col items-center justify-center text-destructive bg-destructive/10 p-6 rounded-md">
          <AlertTriangle className="h-10 w-10 mb-2" />
          <p className="text-lg font-medium">{error}</p>
          <Button onClick={fetchItems} variant="outline" className="mt-4">
            Try Again
          </Button>
        </div>
      )}

      {!isLoading && !error && items.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center py-10 border-2 border-dashed border-border rounded-lg">
          <ListChecks className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-muted-foreground">Your waitlist is empty!</h3>
          <p className="text-muted-foreground mt-1">Add items you want by uploading a screenshot.</p>
          <Button onClick={() => setIsUploadDialogOpen(true)} className="mt-6">
            <ImageUp className="mr-2 h-5 w-5" /> Upload First Screenshot
          </Button>
        </div>
      )}

      {!isLoading && !error && items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <WaitlistItemCard key={item.id} item={item} onTryOnComplete={fetchItems} />
          ))}
        </div>
      )}

      <UploadScreenshotDialog
        isOpen={isUploadDialogOpen}
        onOpenChange={setIsUploadDialogOpen}
        onItemAdded={handleItemAdded}
      />
    </div>
  )
} 