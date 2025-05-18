'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/stores/Cart';
import { Product } from '@/Api';
import React from 'react';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);

  const [product, setProduct] = useState<Product | null>(null);
  const addToCart = useCartStore((state) => state.addToCart);
  const router = useRouter();

   const BASE_IMAGE_URL = 'http://localhost:5051/uploads/';

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`http://localhost:5051/products/${id}`);
        if (!res.ok) throw new Error('Ошибка при загрузке продукта');
        const data = await res.json();

        const formattedProduct: Product = {
          id: data.id,
          name: data.title,
          price: data.price.toString(),
          image: data.image ? `${BASE_IMAGE_URL}${data.image}` :  undefined,
          description: data.description,
        };
        setProduct(formattedProduct);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center py-10 text-muted-foreground">Загрузка...</p>;

  return (
    <main className="container mx-auto p-6 max-w-6xl max-h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="w-full relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500">
              Нет изображения
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">{product.name}</h1>
            <p className="mt-3 text-muted-foreground text-lg">{product.description}</p>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-primary">{product.price}₸</span>
          </div>

          <Button
            onClick={() => addToCart(product)}
            className="w-full max-w-sm text-lg py-6 rounded-xl shadow-md transition hover:scale-[1.02]"
          >
            <ShoppingCart className="mr-3 h-6 w-6" />
            Добавить в корзину
          </Button>

          <button
            onClick={() => router.back()}
            className="text-sm underline text-muted-foreground hover:text-primary"
          >
            ← Назад к списку товаров
          </button>
        </div>
      </div>
    </main>
  );
}