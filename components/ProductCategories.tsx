"use client"
import { FC } from 'react'
import { api } from '@/convex/_generated/api'
import { useMutation, useQuery } from 'convex/react'

interface ProductCategoriesProps {

}
const ProductCategories: FC<ProductCategoriesProps> = ({ }) => {
    const categories = useQuery(api.collection.getCategory);
    return <div className='flex gap-x-4 items-center justify-center'>
        {
            categories?.map(({ name }) => (
                <p className='rounded-md p-2 border cursor-pointer'>{name}</p>
            ))
        }
    </div>
}

export default ProductCategories