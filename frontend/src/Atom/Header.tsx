'use client';

import Link from 'next/link';
import { ShoppingCart, Home, Info, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/Cart';

export const Header = () => {
 const cart = useCartStore((state) => state.cart);

  return (
    <header className="w-full shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold tracking-tight text-gray-900 hover:text-gray-700 transition">
          MyShop
        </Link>

        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
          <Link href="/" className="flex items-center gap-1 hover:text-black transition">
            <Home className="w-4 h-4" /> Главная
          </Link>
          <Link href="/about" className="flex items-center gap-1 hover:text-black transition">
            <Info className="w-4 h-4" /> О нас
          </Link>
          <Link href="/contact" className="flex items-center gap-1 hover:text-black transition">
            <Phone className="w-4 h-4" /> Контакты
          </Link>
        </nav>

        <Link href="/Cart">
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="w-5 h-5 text-gray-700 hover:text-black transition" />
             {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
                )}
          </Button>
        </Link>
      </div>
    </header>
  );
}
