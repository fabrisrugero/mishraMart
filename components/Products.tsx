"use client"
import { FC } from 'react'
import { api } from '@/convex/_generated/api'
import { useMutation, useQuery } from 'convex/react'
import ProductsList from './ProductsList'

interface ProductsProps {

}

const Products: FC<ProductsProps> = ({ }) => {
    const Products = useQuery(api.collection.getProducts);
    const ProductImages = useQuery(api.collection.getImages);
    const Categories = useQuery(api.collection.getCategory);
    // console.log(Products)
    // console.log(Categories)
    return <section>
        <div className='px-20 py-12 flex flex-col gap-y-12'>
            {
                Categories?.map(({ name, _id }) => (
                    <div className='flex flex-col gap-y-4'>
                        <h1 className='text-2xl font-extrabold'>{name}</h1>
                        <ProductsList _id={_id} Products={Products} ProductImages={ProductImages} />
                    </div>
                ))
            }
        </div>
    </section>
}

export default Products