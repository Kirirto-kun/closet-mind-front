"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle, Loader2, AlertTriangle, Shirt } from "lucide-react"
import { apiCall } from "@/lib/api"
import type { ClothingItemResponse } from "@/lib/types"
import AddWardrobeItemDialog from "@/components/dashboard/wardrobe/add-item-dialog"
import WardrobeItemCard from "@/components/dashboard/wardrobe/wardrobe-item-card"

export default function WardrobePage() {
  const [items, setItems] = useState<ClothingItemResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const fetchItems = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await apiCall<ClothingItemResponse[]>("/wardrobe/items")
      setItems(data)
    } catch (err) {
      setError("Failed to fetch wardrobe items. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const handleItemAdded = () => {
    fetchItems() // Refresh list after adding
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold tracking-tight">My Wardrobe</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2 h-5 w-5" /> Add Item
        </Button>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="ml-3 text-lg">Loading your wardrobe...</p>
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
          <Shirt className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-muted-foreground">Your wardrobe is empty!</h3>
          <p className="text-muted-foreground mt-1">Start by adding your favorite clothing items.</p>
          <Button onClick={() => setIsDialogOpen(true)} className="mt-6">
            <PlusCircle className="mr-2 h-5 w-5" /> Add First Item
          </Button>
        </div>
      )}

      {!isLoading && !error && items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <WardrobeItemCard key={item.id} item={item} />
          ))}
        </div>
      )}

      <AddWardrobeItemDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} onItemAdded={handleItemAdded} />
    </div>
  )
}
