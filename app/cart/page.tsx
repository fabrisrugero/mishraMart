"use client";

import { useEffect, useState } from 'react';
import CartItems from './components/CartItems';
import useCart from '@/hooks/Cart';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import CheckOut from '@/components/CheckOut';
import { Skeleton } from "@/components/ui/skeleton"



export const revalidate = 0;

const CartPage = () => {
    const [isMounted, setIsMounted] = useState(false);
    const cart = useCart();
    const ProductImages = useQuery(api.collection.getImages);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }
    if (cart.items.length === 0) return (
        <div className="bg-white">
            {/* <Container> */}
            <div className="px-4 py-16 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
                <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
                    <div className="lg:col-span-7">
                        <ul className='flex flex-col gap-y-12'>
                            {[1, 2, 3].map(() => (
                                <div className="flex items-center space-x-4">
                                    <Skeleton className="h-12 w-12 rounded-full" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-[250px]" />
                                        <Skeleton className="h-4 w-[200px]" />
                                    </div>
                                </div>
                            ))}
                        </ul>
                    </div>

                    <CheckOut Products={cart.items} />
                </div>
            </div>
        </div>
    )

    return (
        <div className="bg-white">
            {/* <Container> */}
            <div className="px-4 py-16 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
                <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
                    <div className="lg:col-span-7">
                        {cart.items.length === 0 && <p className="text-neutral-500">No items added to cart.</p>}
                        <ul>
                            {cart.items.map((item) => (
                                <CartItems key={item._id} data={item} src={ProductImages?.find(({ productId }) => productId === item._id)?.url} />
                            ))}
                        </ul>
                    </div>
                    <CheckOut Products={cart.items} />
                </div>
            </div>
        </div>
    )
};

export default CartPage;