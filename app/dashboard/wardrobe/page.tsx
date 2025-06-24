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
      const category = item.category || item.features?.category || UNCATEGORIZED_KEY
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(item)
      return acc
    }, {} as GroupedItems)
  }, [items])

  useEffect(() => {
    if (Object.keys(groupedItems).length > 0) {
      setActiveAccordionItems(Object.keys(groupedItems))
    }
  }, [groupedItems])

  const handleItemAdded = () => {
    fetchItems()
  }

  const handleDeleteItem = async (itemId: number) => {
    const originalItems = [...items]
    setItems(currentItems => currentItems.filter(item => item.id !== itemId))
    setError(null)

    try {
      await apiCall(`/wardrobe/items/${itemId}`, {
        method: 'DELETE',
      })
    } catch (err) {
      setError("Failed to delete item. Please try again.")
      setItems(originalItems)
      console.error(err)
    }
  }

  const categoryOrder = useMemo(() => {
    const order = Object.keys(groupedItems).sort((a, b) => {
      if (a === UNCATEGORIZED_KEY) return 1
      if (b === UNCATEGORIZED_KEY) return -1
      return a.localeCompare(b)
    })
    return order
  }, [groupedItems])

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">My Wardrobe</h2>
        <Button 
          onClick={() => setIsDialogOpen(true)}
          className="w-full sm:w-auto h-11 md:h-10"
        >
          <ImageUp className="mr-2 h-4 w-4 md:h-5 md:w-5" /> 
          Upload Photos
        </Button>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-12 md:py-16">
          <div className="text-center">
            <Loader2 className="h-10 w-10 md:h-12 md:w-12 animate-spin text-primary mx-auto mb-3" />
            <p className="text-base md:text-lg">Loading your wardrobe...</p>
          </div>
        </div>
      )}

      {!isLoading && error && (
        <div className="flex flex-col items-center justify-center text-destructive bg-destructive/10 p-6 md:p-8 rounded-md">
          <AlertTriangle className="h-8 w-8 md:h-10 md:w-10 mb-2" />
          <p className="text-base md:text-lg font-medium text-center">{error}</p>
          <Button onClick={fetchItems} variant="outline" className="mt-4">
            Try Again
          </Button>
        </div>
      )}

      {!isLoading && !error && items.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center py-12 md:py-16 border-2 border-dashed border-border rounded-lg">
          <Shirt className="h-12 w-12 md:h-16 md:w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg md:text-xl font-semibold text-muted-foreground">Your wardrobe is empty!</h3>
          <p className="text-muted-foreground mt-1 mb-6">Start by uploading photos of your clothing items.</p>
          <Button 
            onClick={() => setIsDialogOpen(true)} 
            className="w-full sm:w-auto"
          >
            <ImageUp className="mr-2 h-4 w-4 md:h-5 md:w-5" /> 
            Upload First Photos
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
              <AccordionTrigger className="px-3 md:px-4 py-3 hover:no-underline">
                <div className="flex items-center">
                  <Layers className="mr-2 md:mr-3 h-4 w-4 md:h-5 md:w-5 text-primary" />
                  <span className="text-base md:text-lg font-medium capitalize">
                    {category} ({groupedItems[category].length})
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-3 md:px-4 pt-0 pb-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 pt-2">
                  {groupedItems[category].map((item) => (
                    <WardrobeItemCard key={item.id} item={item} onDelete={handleDeleteItem} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      <AddWardrobeItemDialog 
        isOpen={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        onItemAdded={handleItemAdded} 
      />
    </div>
  )
}