"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import AgentMessageRenderer from "./agent-message-renderer"

export default function ChatDemo() {
  // Sample data for testing
  const searchAgentResponse = JSON.stringify({
    result: {
      products: [
        {
          name: "Черная футболка Uniqlo",
          price: "1299 ₽",
          description: "Базовая хлопковая футболка, идеальна для повседневной носки. Мягкий материал и классический крой.",
          link: "https://www.uniqlo.com/ru/products/example1"
        },
        {
          name: "Nike Dri-FIT футболка",
          price: "$29.99",
          description: "Спортивная футболка с технологией отвода влаги. Отлично подходит для тренировок и активного отдыха.",
          link: "https://www.nike.com/products/example2"
        },
        {
          name: "Zara Essentials футболка",
          price: "990 ₽",
          description: "Стильная футболка из органического хлопка. Современный силуэт и высокое качество материала.",
          link: "https://www.zara.com/products/example3"
        }
      ]
    }
  })

  const outfitAgentResponse = JSON.stringify({
    result: {
      outfit_description: "Стильный повседневный образ для прогулки по городу",
      items: [
        {
          name: "Белая рубашка",
          category: "Рубашки",
          image_url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop"
        },
        {
          name: "Синие джинсы",
          category: "Брюки",
          image_url: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop"
        },
        {
          name: "Белые кроссовки",
          category: "Обувь",
          image_url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop"
        }
      ],
      reasoning: "Эти вещи отлично сочетаются: белый и синий - классическое сочетание, а белые кроссовки добавляют образу современности и комфорта. Такой наряд подойдет как для деловой встречи, так и для неформальной прогулки."
    }
  })

  const generalAgentResponse = JSON.stringify({
    result: {
      response: "Мода - это способ выражения себя без слов. Она отражает нашу личность, настроение и культуру. В современном мире мода стала более демократичной и разнообразной, позволяя каждому найти свой уникальный стиль.\n\nОсновные принципы хорошего стиля:\n• Комфорт и удобство\n• Соответствие случаю\n• Качество материалов\n• Личные предпочтения\n• Умение сочетать цвета и текстуры\n\nПомните: лучший наряд - тот, в котором вы чувствуете себя уверенно!"
    }
  })

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">ClosetMind Chat - Демонстрация</h1>
        <p className="text-muted-foreground">
          Примеры ответов от всех трех агентов системы
        </p>
      </div>

      <div className="space-y-8">
        {/* Search Agent Demo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🛍️ Search Agent - Поиск товаров
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Пример запроса: "Найди мне черную футболку"
            </p>
          </CardHeader>
          <CardContent>
            <AgentMessageRenderer content={searchAgentResponse} />
          </CardContent>
        </Card>

        <Separator />

        {/* Outfit Agent Demo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              👗 Outfit Agent - Рекомендации образов
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Пример запроса: "Что мне надеть для прогулки по городу?"
            </p>
          </CardHeader>
          <CardContent>
            <AgentMessageRenderer content={outfitAgentResponse} />
          </CardContent>
        </Card>

        <Separator />

        {/* General Agent Demo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              💬 General Agent - Общие вопросы
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Пример запроса: "Расскажи о современной моде"
            </p>
          </CardHeader>
          <CardContent>
            <AgentMessageRenderer content={generalAgentResponse} />
          </CardContent>
        </Card>
      </div>

      <div className="text-center pt-8">
        <Button asChild>
          <a href="/dashboard/chat">
            Перейти к реальному чату
          </a>
        </Button>
      </div>
    </div>
  )
} 