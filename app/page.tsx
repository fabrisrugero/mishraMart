"use client"

import ImageSlider from '@/components/ImageSlider'
import ProductCategories from '@/components/ProductCategories'
import Products from '@/components/Products'


export default function Home() {
  return (
    <main className='flex flex-col '>
      <div className='relative h-[500px] mb-4'>
        <ImageSlider />
      </div>
      <ProductCategories />
      <Products />
    </main>
  )
}
