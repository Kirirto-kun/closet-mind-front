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
    <Card className="overflow-hidden flex flex-col h-full">
      <CardHeader className="p-0 relative aspect-[3/4]">
        <Image
          src={item.image_url || placeholderImg}
          alt={item.name}
          layout="fill"
          objectFit="cover"
          onError={(e) => {
            ;(e.target as HTMLImageElement).src = placeholderImg
          }}
        />
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-semibold truncate" title={item.name}>
          {item.name}
        </CardTitle>
        {item.features && Object.keys(item.features).length > 0 && (
          <div className="mt-2 space-x-1 space-y-1">
            {Object.entries(item.features)
              .slice(0, 3)
              .map(([key, value]) => (
                <span
                  key={key}
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                >
                  <Tag size={12} className="mr-1" /> {key}: {String(value)}
                </span>
              ))}
            {Object.keys(item.features).length > 3 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                ...
              </span>
            )}
          </div>
        )}
      </CardContent>
      {/* <CardFooter className="p-4 pt-0">
        <Button variant="outline" size="sm" className="w-full">View Details</Button>
      </CardFooter> */}
    </Card>
  )
}
