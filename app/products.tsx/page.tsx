// app/products/page.tsx
import { createClient } from "@/utils/supabase/server";
import ProductCard from '@/components/ProductCard'

type Product = {
  id: number
  title: string
  description: string
  image_path: string // Your actual column name
  price: number
  category?: string
  discounted_price?: number
  tokens_earned?: number
  is_sponsored?: boolean
  views?: number
  order_id?: number
  created_at?: string
  updated_at?: string
}

export default async function ProductsPage() {
  const supabase = await createClient();

  // Select all columns including the correct image column name
  const { data: products, error } = await supabase
    .from('products')
    .select('*') // Select all columns to get everything from your database

  if (error) {
    console.error("Error fetching products:", error.message);
    return <p className="text-red-600">Error fetching products: {error.message}</p>
  }

  // Handle case where products might be null or empty
  if (!products || products.length === 0) {
    return (
      <main className="p-8">
        <div className="text-center py-8">
          <p>No products found.</p>
        </div>
      </main>
    );
  }

  // Generate public URLs for images like in your homepage
  const productCards = await Promise.all(
    products.map(async (product: Product) => {
      // Generate public URL for image using the correct column name
      const { data } = supabase.storage
        .from("product-images")
        .getPublicUrl(product.image_path);

      return {
        ...product,
        imageUrl: data.publicUrl,
      };
    })
  );

  return (
    <main className="p-8 bg-pink-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Our Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productCards.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.imageUrl} // Use the generated public URL
              title={product.title}
              description={product.description}
              price={product.price}
              category={product.category}
              discounted_price={product.discounted_price}
              tokens_earned={product.tokens_earned}
              is_sponsored={product.is_sponsored}
              views={product.views}
              order_id={product.order_id}
            />
          ))}
        </div>
      </div>
    </main>
  )
}