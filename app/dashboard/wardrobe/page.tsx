"use client"
import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, AlertTriangle, Shirt, ImageUp, Layers } from "lucide-react"
import { apiCall } from "@/lib/api"
import type { ClothingItemResponse } from "@/lib/types"
import AddWardrobeItemDialog from "@/components/dashboard/wardrobe/add-item-dialog"
import WardrobeItemCard from "@/components/dashboard/wardrobe/wardrobe-item-card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface GroupedItems {
  [category: string]: ClothingItemResponse[]
}

const UNCATEGORIZED_KEY = "Uncategorized"

export default function WardrobePage() {
  const [items, setItems] = useState<ClothingItemResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeAccordionItems, setActiveAccordionItems] = useState<string[]>([])

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

  const groupedItems = useMemo(() => {
    return items.reduce((acc, item) => {
      // Prioritize explicit category field. Fallback to features.category if needed.
      const category = item.category || item.features?.category || UNCATEGORIZED_KEY
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(item)
      return acc
    }, {} as GroupedItems)
  }, [items])

  // Automatically open all accordion items when items are loaded
  useEffect(() => {
    if (Object.keys(groupedItems).length > 0) {
      setActiveAccordionItems(Object.keys(groupedItems))
    }
  }, [groupedItems])

  const handleItemAdded = () => {
    fetchItems() // Refresh list after adding
  }

  const categoryOrder = useMemo(() => {
    const order = Object.keys(groupedItems).sort((a, b) => {
      if (a === UNCATEGORIZED_KEY) return 1 // Push Uncategorized to the end
      if (b === UNCATEGORIZED_KEY) return -1
      return a.localeCompare(b) // Sort other categories alphabetically
    })
    return order
  }, [groupedItems])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold tracking-tight">My Wardrobe</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <ImageUp className="mr-2 h-5 w-5" /> Upload Photos
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
          <p className="text-muted-foreground mt-1">Start by uploading photos of your clothing items.</p>
          <Button onClick={() => setIsDialogOpen(true)} className="mt-6">
            <ImageUp className="mr-2 h-5 w-5" /> Upload First Photos
          </Button>
        </div>
      )}

      {!isLoading && !error && items.length > 0 && (
        <Accordion
          type="multiple"
          className="w-full space-y-2"
          value={activeAccordionItems}
          onValueChange={setActiveAccordionItems}
        >
          {categoryOrder.map((category) => (
            <AccordionItem value={category} key={category} className="border bg-card rounded-md">
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex items-center">
                  <Layers className="mr-3 h-5 w-5 text-primary" />
                  <span className="text-lg font-medium capitalize">
                    {category} ({groupedItems[category].length})
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pt-0 pb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-2">
                  {groupedItems[category].map((item) => (
                    <WardrobeItemCard key={item.id} item={item} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      <AddWardrobeItemDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} onItemAdded={handleItemAdded} />
    </div>
  )
}
