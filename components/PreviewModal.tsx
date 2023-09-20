import { FC, useState } from 'react'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import Image from 'next/image'
import { Eye, Minus, Plus, ShoppingCart } from 'lucide-react'
import { Button } from './ui/button'
import useCart from '@/hooks/Cart'
import IconButton from './ui/IconButton'


interface PreviewModalProps {
    name: string
    src: string
    price: number
    categoryId: string
    _id: string
}

const PreviewModal: FC<PreviewModalProps> = ({ _id, name, src, price, categoryId }) => {
    const cart = useCart()
    const [quantity, setQuantity] = useState(1);

    const onAddToCart = () => {
        cart.addItem({
            _id,
            name,
            price,
            categoryId,
        });
    }
    return <HoverCard >
        <HoverCardTrigger className='cursor-pointer'><Eye color='green' /></HoverCardTrigger>
        <HoverCardContent>
            {name}
            <Image height={250} width={250} className='aspect-square object-contain' src={src} alt="" />
            <div className='flex justify-between'>
                <p>$ {price}</p>
                <p className='flex items-center gap-2'>
                    <IconButton onClick={() => {
                        if (quantity > 1) {
                            setQuantity(prev => prev - 1)
                        }
                    }} icon={<Minus size={15} />} />
                    {quantity}
                    <IconButton onClick={() => setQuantity(prev => prev + 1)} icon={<Plus size={15} />} />


                </p>
            </div>
            <Button onClick={onAddToCart} className="flex items-center bg-green-50 shadow text-black hover:bg-green-100 mt-4 gap-x-2">
                Add To Cart
                <ShoppingCart />
            </Button>

        </HoverCardContent>
    </HoverCard>

}

export default PreviewModal