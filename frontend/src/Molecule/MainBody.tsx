'use client';

import {  Star, ShieldCheck, Truck } from 'lucide-react';
import { ProductCard } from './ProductCard'
import { fetchProducts, Product } from '@/Api';
import { useEffect, useState } from 'react';

interface MainBodyProps {
  products: Product[];
}


export default function MainBody() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  return (
    <main className="container mx-auto px-4 py-10 space-y-16">
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 leading-tight">Стильно. Удобно. С душой.</h1>
        <p className="text-gray-600 mb-6 text-lg">
          MyShop — это ваш онлайн-магазин стильной одежды с элементами национального колорита.
        </p>
      </section>

      <section className="max-w-4xl mx-auto text-center space-y-4">
        <h2 className="text-3xl font-semibold">О нас</h2>
        <p className="text-gray-600 text-lg">
          Мы вдохновляемся богатой культурой Казахстана и создаем уникальные вещи, которые сочетают
          в себе традиции и современность. Каждый товар — это история, которую приятно носить.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="flex flex-col items-center">
          <Truck className="w-10 h-10 text-primary mb-2" />
          <h3 className="text-xl font-medium">Быстрая доставка</h3>
          <p className="text-gray-500">Доставка по всему Казахстану за 1–3 дня</p>
        </div>
        <div className="flex flex-col items-center">
          <ShieldCheck className="w-10 h-10 text-primary mb-2" />
          <h3 className="text-xl font-medium">Гарантия качества</h3>
          <p className="text-gray-500">Только проверенные материалы и надежный пошив</p>
        </div>
        <div className="flex flex-col items-center">
          <Star className="w-10 h-10 text-primary mb-2" />
          <h3 className="text-xl font-medium">Отзывы клиентов</h3>
          <p className="text-gray-500">Нас рекомендуют 97% покупателей</p>
        </div>
      </section>



        <section>
        <h2 className="text-3xl font-semibold mb-6 text-center">Товары</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
