"use client"

import { FC, useContext, useEffect, useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { uploadData } from '@/helpers/constants/upload-data';
import useFileData from '@/hooks/FileData';
import { useMutation } from '@tanstack/react-query'
import { FileDataMessage } from '@/lib/validators/file';
import { nanoid } from 'nanoid';
import { FileDataMessagesContext } from '@/context/fileDataMessage';
import toast from 'react-hot-toast';
import useCart from '@/hooks/Cart';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

interface DemohaiProps {
    Products: any[];
}

const Demohai: FC<DemohaiProps> = ({ Products }) => {
    const tods = useQuery(api.file.getFile);
    const cart = useFileData();
    const FileDatItems = useFileData((state) => state.items)

    const [data, setData] = useState<string>('');
    const [responseData, setResponseData] = useState<string | null>(null);
    const cartItems = useCart()
    const router = useRouter();

    const {
        messages,
        addMessage,
        removeMessage,
        updateMessage,
        setIsMessageUpdating,
    } = useContext(FileDataMessagesContext)



    const { mutate: sendMessage, isLoading } = useMutation({
        mutationKey: ['sendMessage'],
        mutationFn: async (message: FileDataMessage) => {
            const response = await fetch('/api/fileData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages: [message], Products }),
            })

            return response.body
        },
        onMutate(message) {
            console.log("ON MUTATE WALA MESSAGE: ->", message)
            addMessage(message)
        },
        onSuccess: async (stream) => {
            if (!stream) throw new Error('No stream')

            // construct new message to add
            const id = nanoid()
            const responseMessage: FileDataMessage = {
                id,
                isUserMessage: false,
                data: '',
            }


            addMessage(responseMessage)
            setIsMessageUpdating(true)

            const reader = stream.getReader()
            const decoder = new TextDecoder()
            let done = false

            while (!done) {
                const { value, done: doneReading } = await reader.read()
                done = doneReading
                const chunkValue = decoder.decode(value)
                updateMessage(id, (prev) => prev + chunkValue)
            }
            setIsMessageUpdating(false)
            setData('')
        },
        onError: (_, message) => {
            toast.error('Something went wrong. Please try again.')
            removeMessage(message.id)
        },
    })

    useEffect(() => {
        const fetchData = async () => {
            if (tods?.[0]?.src) {
                const result = await uploadData(tods[0].src);
                setData(result);
            }
        };

        fetchData();
    }, [tods]);
    // console.log("THIS IS DATA: ->>>", data);
    useEffect(() => {
        if (messages[2]?.data) {
            onFilterProducts()
        }
    }, [messages]);
    const onFilterProducts = () => {
        try {
            if (messages[2]?.data) {
                const messageData = JSON.parse(messages[2].data);

                // Ensure messageData is an array before proceeding
                if (Array.isArray(messageData)) {
                    const itemNamesToFilter = messageData.map((item) => item.name.toLowerCase());
                    const filteredProducts = Products.filter((product) => {
                        const productName = product.name.toLowerCase();
                        return itemNamesToFilter.includes(productName);
                    });

                    console.log("FILTERED PRODUCTS: ->", filteredProducts);
                    filteredProducts.map((product) => {
                        console.log("Adding product to cart:", product);
                        console.log("Cart items:", cart.items);
                        cartItems.addItem(product);
                    });
                    console.log("All products added to the cart.");

                }
            }
        } catch (error) {
        }
    };

    const onAddToFileData = async () => {
        if (data) {
            cart.addFileItems({
                data,
            });
        }
        const id = nanoid();
        const message: FileDataMessage = {
            id,
            isUserMessage: true,
            data: data || '',
        }
        sendMessage(message)
        router.push("/cart")
    };
    console.log("MESSAGES: ->", typeof messages[2]?.data)
    return (
        <div className=''>
            <Button onClick={onAddToFileData} className=' bg-green-700 hover:bg-green-600'>Add To Cart</Button>
        </div>
    );
};

export default Demohai;
