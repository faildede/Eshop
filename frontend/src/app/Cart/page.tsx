'use client';

import { useCartStore } from '@/stores/Cart';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Cart() {
  const items = useCartStore((state) => state.cart); 
  const clearCart = useCartStore((state) => state.clearCart);

  const totalPrice = items.reduce((sum: number, item) => sum + parseFloat(item.price), 0); 

  return (
    <main className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Корзина</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">Ваша корзина пуста.</p>
      ) : (
        <>
          <ul className="space-y-6">
            {items.map((item, index) => (
              <li key={index} className="flex items-center gap-4 border-b pb-4">
                <Image
                  src={item.image || '/placeholder.jpg'}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-500">{item.price} ₸</p>
                  <p className="text-sm text-gray-500">Кол-во: {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between items-center">
            <p className="text-xl font-bold">Итого: {totalPrice.toFixed(2)} ₸</p>
            <Button onClick={clearCart} variant="destructive">Очистить корзину</Button>
          </div>
        </>
      )}
    </main>
  );
}
