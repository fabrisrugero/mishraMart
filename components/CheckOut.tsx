"use client"
import { api } from '@/convex/_generated/api';
import { Product } from '@/types';
import { FC } from 'react'
import { Button } from './ui/button';


interface CheckOutProps {
    Products: Product[]
}

const CheckOut: FC<CheckOutProps> = ({ Products }) => {

    const totalPrice = Products.reduce((total, item) => {
        return total + item.price;
    }, 0).toFixed(2);
    const onCheckout = async () => {
        const response = await fetch('/api/checkOut', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Products }),
        })
        const data = await response.json()
        console.log(data)
        window.location = data.url;
    }
    return (
        <div
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
        >
            <h2 className="text-lg font-medium text-gray-900">
                Order summary
            </h2>
            <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-medium text-gray-900">Order total</div>
                    US$ {totalPrice}
                </div>
            </div>
            <Button onClick={onCheckout} disabled={Products.length === 0} className=" bg-green-700 hover:bg-green-600 w-full mt-6">
                Checkout
            </Button>
        </div>
    )
}

export default CheckOut