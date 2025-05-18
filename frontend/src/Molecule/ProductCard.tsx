'use client';

import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Product } from '@/Api';
import { useCartStore } from '@/stores/Cart';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
     <Card>
      <Link href={`/product/${product.id}`} className="block">
        <CardHeader>
          <Image
            src={product.image || '/placeholder.jpg'}
            alt={product.name}
            width={400}
            height={300}
            className="rounded-md object-cover w-full h-48"
          />
          <CardTitle>{product.name}</CardTitle>
        </CardHeader>
      </Link>
      <CardContent>{product.price}₸</CardContent>
      <CardFooter>
        <Button onClick={() => addToCart(product)} className="w-full">
          <ShoppingCart className="mr-2 h-4 w-4" />
          В корзину
        </Button>
      </CardFooter>
    </Card>
  );
}

