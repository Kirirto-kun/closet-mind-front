import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import type { ClothingItemResponse } from "@/lib/types"
import { Tag } from "lucide-react"

interface WardrobeItemCardProps {
  item: ClothingItemResponse
}

export default function WardrobeItemCard({ item }: WardrobeItemCardProps) {
  const placeholderImg = `/placeholder.svg?width=300&height=400&query=${encodeURIComponent(item.name || "clothing item")}`

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