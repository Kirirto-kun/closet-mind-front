import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import type { ClothingItemResponse } from "@/lib/types"
import { Tag, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WardrobeItemCardProps {
  item: ClothingItemResponse
  onDelete: (itemId: number) => void
}

export default function WardrobeItemCard({ item, onDelete }: WardrobeItemCardProps) {
  const placeholderImg = `/placeholder.svg?width=300&height=400&query=${encodeURIComponent(item.name || "clothing item")}`

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    onDelete(item.id)
  }

  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
      <CardHeader className="p-0 relative aspect-[3/4]">
        <Image
          src={item.image_url || placeholderImg}
          alt={item.name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
          onError={(e) => {
            ;(e.target as HTMLImageElement).src = placeholderImg
          }}
        />
        <Button
          onClick={handleDeleteClick}
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2 h-7 w-7 z-10"
          aria-label="Delete item"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-2 md:p-3 flex-grow">
        <CardTitle className="text-sm md:text-base font-semibold truncate mb-2" title={item.name}>
          {item.name}
        </CardTitle>
        {item.features && Object.keys(item.features).length > 0 && (
          <div className="space-y-1">
            {Object.entries(item.features)
              .slice(0, 2)
              .map(([key, value]) => (
                <span
                  key={key}
                  className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground mr-1"
                >
                  <Tag size={10} className="mr-1" /> 
                  {key}: {String(value)}
                </span>
              ))}
            {Object.keys(item.features).length > 2 && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                +{Object.keys(item.features).length - 2} more
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}