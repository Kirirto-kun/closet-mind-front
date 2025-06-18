"use client"
import { ExternalLink, ShoppingCart } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Product {
  name: string
  price: string
  description: string
  link: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const handleOpenLink = () => {
    window.open(product.link, '_blank', 'noopener,noreferrer')
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 max-w-sm">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-sm line-clamp-2 flex-1" title={product.name}>
              {product.name}
            </h3>
            <Badge variant="secondary" className="ml-2 font-bold">
              {product.price}
            </Badge>
          </div>
          
          <p className="text-xs text-muted-foreground line-clamp-3" title={product.description}>
            {product.description}
          </p>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleOpenLink}
          className="w-full group-hover:shadow-md transition-all duration-300"
          size="sm"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Перейти в магазин
          <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  )
} 