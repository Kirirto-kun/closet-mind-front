"use client"
import { useState } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { apiCall } from "@/lib/api"
import type { WaitListItemCreate } from "@/lib/types"
import { toast } from "sonner"

interface AddWaitlistItemDialogProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  onItemAdded: () => void
}

export default function AddWaitlistItemDialog({ isOpen, onOpenChange, onItemAdded }: AddWaitlistItemDialogProps) {
  const [imageUrl, setImageUrl] = useState("")
  const [status, setStatus] = useState("pending")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const newItem: WaitListItemCreate = {
      image_url: imageUrl,
      status,
    }

    try {
      await apiCall("/waitlist/items", {
        method: "POST",
        body: JSON.stringify(newItem),
      })
      toast.success("Item added to waitlist!")
      onItemAdded()
      onOpenChange(false) // Close dialog
      setImageUrl("")
      setStatus("pending")
    } catch (error) {
      console.error("Failed to add item:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Item to Waitlist by URL</DialogTitle>
          <DialogDescription>Enter the direct image URL of the item you want to add.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div>
            <Label htmlFor="imageUrlWaitlist" className="text-right">
              Image URL
            </Label>
            <Input
              id="imageUrlWaitlist"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
              disabled={isSubmitting}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div>
            <Label htmlFor="statusWaitlist" className="text-right">
              Status
            </Label>
            <Input
              id="statusWaitlist"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              disabled={isSubmitting}
              placeholder="e.g., pending, considering"
            />
            <p className="text-xs text-muted-foreground mt-1">Default: pending</p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isSubmitting}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add to Waitlist
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
