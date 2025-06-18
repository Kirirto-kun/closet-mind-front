"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Dialog, DialogContent } from "@/components/ui/dialog";

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
          // Не указываем Content-Type, браузер сам установит правильный с boundary для multipart/form-data
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
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Try-On: примерка одежды</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <Label htmlFor="human">Фото человека</Label>
          <Input
            id="human"
            type="file"
            accept="image/*"
            onChange={e => setHumanFile(e.target.files?.[0] || null)}
            required
          />
        </div>
        <div>
          <Label htmlFor="clothing">Фото одежды</Label>
          <Input
            id="clothing"
            type="file"
            accept="image/*"
            onChange={e => setClothingFile(e.target.files?.[0] || null)}
            required
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Загрузка..." : "Создать try-on"}
        </Button>
        {error && <div className="text-red-500">{error}</div>}
      </form>
      <h2 className="text-xl font-semibold mb-4">Мои try-on'ы</h2>
      {loading && <div>Загрузка...</div>}
      <div className="grid gap-4">
        {tryons.map(tryon => (
          <Card key={tryon.id} className="p-4 flex flex-col md:flex-row gap-4 items-center">
            <div className="flex gap-2">
              <img src={tryon.human_image_url} alt="Человек" className="w-24 h-24 object-cover rounded" />
              <img src={tryon.clothing_image_url} alt="Одежда" className="w-24 h-24 object-cover rounded" />
            </div>
            <img
              src={tryon.result_url}
              alt="Результат"
              className="w-32 h-32 object-cover rounded border cursor-pointer transition hover:scale-105"
              onClick={() => {
                setSelectedImage(tryon.result_url);
                setOpen(true);
              }}
            />
            <div className="text-xs text-gray-500 mt-2 md:mt-0 md:ml-4">{new Date(tryon.created_at).toLocaleString()}</div>
          </Card>
        ))}
        {tryons.length === 0 && !loading && <div>Нет try-on'ов</div>}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl flex flex-col items-center">
          {selectedImage && (
            <img src={selectedImage} alt="Try-on full" className="max-h-[80vh] w-auto rounded shadow-lg" />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}