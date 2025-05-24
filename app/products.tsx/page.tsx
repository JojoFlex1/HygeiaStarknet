// app/products/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import ProductCard from '@/components/ProductCard'

type Product = {
  id: string
  title: string
  description: string
  image: string
  price: number
}

export default async function ProductsPage() {
  const supabase = createServerComponentClient({ cookies })

  const { data: products, error } = await supabase
    .from('products')
    .select('id, title, description, image, price')

  if (error) {
    return <p className="text-red-600">Error fetching products: {error.message}</p>
  }

  return (
    <main className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products?.map((product: Product) => (
        <ProductCard
          key={product.id}
          title={product.title}
          description={product.description}
          image={product.image}
          price={product.price}
        />
      ))}
    </main>
  )
}
