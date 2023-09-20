"use client"

import { FC } from 'react'
import { api } from '@/convex/_generated/api'
import { useMutation, useQuery } from 'convex/react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { formSchema } from '@/lib/validators/file'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './ui/button';
import FileUpload from './FileUpload';
import Demohai from './Demohai'
import { FileDataMessagesProvider } from '@/context/fileDataMessage'
import { useRouter } from 'next/navigation'
import useCart from '@/hooks/Cart'
import Lottie from 'react-lottie'
import wow from "../wow.json"


interface UploadFileProps {

}

const FileForm: FC<UploadFileProps> = ({ }) => {

    const createList = useMutation(api.file.file)
    const Products = useQuery(api.collection.getProducts);
    const router = useRouter();
    const cart = useCart()
    const options = {
        animationData: wow,
        loop: true,
        autoplay: true,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            src: "",
        },
    })
    const isLoading = form.formState.isSubmitting;
    function onSubmit(values: z.infer<typeof formSchema>) {
        createList({
            src: values.src,
        })

        console.log(values)
    }
    return (
        <div className='z-40 absolute top-0 right-6'>
            <Accordion type="single" collapsible className='bg-white'>
                <div className='  bg-white rounded-md overflow-hidden'>
                    <div className='w-full h-full flex flex-col '>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                <div className='flex w-32 gap-x-2  items-center'>
                                    <div className="w-32 relative flex ">
                                        <div className="absolute  -top-12 ">
                                            <Lottie options={options} />
                                        </div>
                                    </div>
                                    <span className='font-medium px-2 py-1 text-sm flex items-center border-2 border-green-400 rounded-lg'>{cart.items.length}
                                    </span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className='p-6 w-80  '>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                            <FormField
                                                control={form.control}
                                                name="src"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className='font-bold'>Magic Cart</FormLabel>
                                                        <FormControl>
                                                            <FileUpload
                                                                disabled={isLoading}
                                                                onChange={field.onChange}
                                                                value={field.value}
                                                            />
                                                        </FormControl>
                                                        <FormDescription>
                                                            Upload List
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <div className='flex gap-x-4'>
                                                <Button className='w-32 border bg-white text-black hover:bg-white' type="submit" >Submit</Button>
                                                <FileDataMessagesProvider>
                                                    <Demohai Products={Products} />
                                                </FileDataMessagesProvider>
                                            </div>
                                        </form>
                                    </Form>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </div>
                </div>
            </Accordion>
        </div>






    )
}

export default FileForm