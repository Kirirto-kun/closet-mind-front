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
import { Textarea } from "@/components/ui/textarea" // For features
import { Loader2 } from "lucide-react"
import { apiCall } from "@/lib/api"
import type { ClothingItemCreate } from "@/lib/types"
import { toast } from "sonner"

interface AddWardrobeItemDialogProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  onItemAdded: () => void
}

export default function AddWardrobeItemDialog({ isOpen, onOpenChange, onItemAdded }: AddWardrobeItemDialogProps) {
  const [name, setName] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [features, setFeatures] = useState("") // Store as JSON string
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    let parsedFeatures: Record<string, any> | undefined
    if (features.trim()) {
      try {
        parsedFeatures = JSON.parse(features)
      } catch (error) {
        toast.error('Invalid JSON format for features. Example: {"color": "red", "season": "summer"}')
        setIsSubmitting(false)
        return
      }
    }

    const newItem: ClothingItemCreate = {
      name,
      image_url: imageUrl,
      ...(parsedFeatures && { features: parsedFeatures }),
    }

    try {
      await apiCall("/wardrobe/items", {
        method: "POST",
        body: JSON.stringify(newItem),
      })
      toast.success("Item added to wardrobe!")
      onItemAdded()
      onOpenChange(false) // Close dialog
      // Reset form
      setName("")
      setImageUrl("")
      setFeatures("")
    } catch (error) {
      console.error("Failed to add item:", error)
      // Error toast is handled by apiCall
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Wardrobe Item</DialogTitle>
          <DialogDescription>
            Enter the details of your clothing item. You can add features like color, season, etc., as a JSON object.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div>
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required disabled={isSubmitting} />
          </div>
          <div>
            <Label htmlFor="imageUrl" className="text-right">
              Image URL
            </Label>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
              disabled={isSubmitting}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div>
            <Label htmlFor="features" className="text-right">
              Features (JSON format)
            </Label>
            <Textarea
              id="features"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              placeholder='e.g., {"color": "blue", "material": "cotton"}'
              disabled={isSubmitting}
              rows={3}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Optional. Example: {"{'color': 'red', 'season': 'summer'}"}
            </p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isSubmitting}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Item
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
