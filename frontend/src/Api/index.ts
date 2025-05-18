
export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string | undefined | null;
}
export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch('http://localhost:5051/products', {
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error('Ошибка при получении продуктов');

    const data = await res.json();

    const products = data?.$values?.map((item: any) => {
      let image = '/placeholder.jpg';

      if (item.image) {
        if (item.image.startsWith('http://') || item.image.startsWith('https://')) {
          image = item.image;
        } else {
          image = `/images/${item.image}`;
        }
      }

      return {
        id: item.id,
        name: item.title,
        description: item.description,
        price: item.price.toString(),
        image,
      };
    });

    return products || [];
  } catch (error) {
    console.error('Ошибка загрузки продуктов:', error);
    return [];
  }
}