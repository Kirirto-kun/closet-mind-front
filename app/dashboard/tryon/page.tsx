"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Loader2, AlertTriangle } from "lucide-react";

const API_BASE_URL = "https://www.closetmind.studio";

interface TryOn {
  id: number;
  user_id: number;
  clothing_image_url: string;
  human_image_url: string;
  result_url: string;
  created_at: string;
}

export default function TryOnPage() {
  const [clothingFile, setClothingFile] = useState<File | null>(null);
  const [humanFile, setHumanFile] = useState<File | null>(null);
  const [tryons, setTryons] = useState<TryOn[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { token, isAuthenticated, isLoading } = useAuth();
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    if (token) fetchTryons(token);
  }, [isAuthenticated, isLoading, token]);

  const fetchTryons = async (token: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/tryon/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Ошибка загрузки истории try-on");
      const data = await res.json();
      setTryons(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clothingFile || !humanFile || !token) return;
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("clothing_image", clothingFile);
      formData.append("human_image", humanFile);

      const res = await fetch(`${API_BASE_URL}/tryon/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Ошибка создания try-on");
      await fetchTryons(token);
      setClothingFile(null);
      setHumanFile(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold">Try-On: примерка одежды</h1>
      
      <Card className="p-4 md:p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="human" className="text-base">Фото человека</Label>
              <Input
                id="human"
                type="file"
                accept="image/*"
                onChange={e => setHumanFile(e.target.files?.[0] || null)}
                required
                className="h-12 text-base"
              />
            </div>
            <div>
              <Label htmlFor="clothing" className="text-base">Фото одежды</Label>
              <Input
                id="clothing"
                type="file"
                accept="image/*"
                onChange={e => setClothingFile(e.target.files?.[0] || null)}
                required
                className="h-12 text-base"
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full md:w-auto h-12 text-base"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Загрузка...
              </>
            ) : (
              "Создать try-on"
            )}
          </Button>
          
          {error && (
            <div className="flex items-center gap-2 text-destructive bg-destructive/10 p-3 rounded-md">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}
        </form>
      </Card>

      <div>
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Мои try-on'ы</h2>
        
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-3" />
              <p className="text-base">Загрузка...</p>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {tryons.map(tryon => (
            <Card key={tryon.id} className="p-4 space-y-4">
              <div className="flex gap-2 justify-center">
                <img 
                  src={tryon.human_image_url} 
                  alt="Человек" 
                  className="w-20 h-20 md:w-24 md:h-24 object-cover rounded border" 
                />
                <img 
                  src={tryon.clothing_image_url} 
                  alt="Одежда" 
                  className="w-20 h-20 md:w-24 md:h-24 object-cover rounded border" 
                />
              </div>
              
              <div className="flex justify-center">
                <img
                  src={tryon.result_url}
                  alt="Результат"
                  className="w-32 h-32 md:w-40 md:h-40 object-cover rounded border cursor-pointer transition hover:scale-105"
                  onClick={() => {
                    setSelectedImage(tryon.result_url);
                    setOpen(true);
                  }}
                />
              </div>
              
              <div className="text-xs text-muted-foreground text-center">
                {new Date(tryon.created_at).toLocaleString()}
              </div>
            </Card>
          ))}
        </div>
        
        {tryons.length === 0 && !loading && (
          <div className="text-center py-12 text-muted-foreground">
            <p>Нет try-on'ов</p>
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl flex flex-col items-center">
          {selectedImage && (
            <img 
              src={selectedImage} 
              alt="Try-on full" 
              className="max-h-[80vh] w-auto rounded shadow-lg" 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}