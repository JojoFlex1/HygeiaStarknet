// app/page.tsx or wherever your homepage is defined

import { createClient } from "@/utils/supabase/server";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";

export default async function HomePage() {
  const supabase = await createClient();

  const { data: products, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    console.error("Error fetching products:", error.message);
    return <div>Error loading products.</div>;
  }

  // Handle case where products might be null
  if (!products || products.length === 0) {
    return (
      <div className="flex-1 space-y-8 bg-pink-50 dark:bg-gray-900">
        <Navbar />
        <div className="text-center py-8">
          <p>No products found.</p>
        </div>
      </div>
    );
  }

  const productCards = await Promise.all(
    products.map(async (product) => {
      // Generate public URL for image - note the column name is 'image_path'
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
    <div className="flex-1 space-y-8 bg-pink-50 dark:bg-gray-900 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
    </div>
  );
}