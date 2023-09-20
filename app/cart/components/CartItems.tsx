import Image from "next/image";
import { Minus, MinusCircle, Plus, PlusCircle, Trash, Trash2, X } from "lucide-react";



// import IconButton from "@/components/ui/icon-button";
// import Currency from "@/components/ui/currency";
// import useCart from "@/hooks/use-cart";
import { Product } from "@/types";
import useCart from "@/hooks/Cart";
import IconButton from "@/components/ui/IconButton";
import { useState } from "react";


interface CartItemProps {
    data: Product;
    src: string | undefined;
}

const CartItem: React.FC<CartItemProps> = ({
    data, src
}) => {
    const cart = useCart();
    const [quantity, setQuantity] = useState(1);

    const onRemove = () => {
        cart.removeItem(data._id);
    };

    return (
        <li className="flex py-6 border-b">
            <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
                <Image
                    fill
                    src={src || "/placeholder.svg"}
                    alt=""
                    className="object-cover object-center"
                />
            </div>
            <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div className="absolute z-10 right-0 top-0">
                    <IconButton onClick={onRemove} icon={<Trash size={15} />} />
                </div>
                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div className="flex justify-between">
                        <p className=" text-lg font-semibold text-black">
                            {data.name}
                        </p>
                    </div>

                    <div className="mt-1 flex text-sm">
                        <p className="text-gray-500">{data.price} $</p>
                        {/* <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{data.size.name}</p> */}
                    </div>
                    {/* <Currency value={data.price} /> */}
                    <div className="flex gap-4 mt-4">
                        <IconButton onClick={() => {
                            if (quantity > 1) {
                                setQuantity(prev => prev - 1)
                            }
                        }} icon={<Minus size={15} />} />
                        {quantity}
                        <IconButton onClick={() => setQuantity(prev => prev + 1)} icon={<Plus size={15} />} />


                    </div>
                </div>
            </div>
        </li>
    );
}

export default CartItem;