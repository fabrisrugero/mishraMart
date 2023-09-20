import Image from 'next/image'
import { FC } from 'react'

const ChatHeader: FC = () => {
    return (
        <div className='w-full flex gap-2 justify-start items-center text-zinc-800'>
            <div className='flex gap-4  items-center'>
                <Image
                    src={'/logo.png'}
                    alt='logo'
                    width={40}
                    height={40}
                />
                <div className='flex flex-col  items-center'>
                    <p className='font-bold text-lg'>ChatBot</p>
                    <p className='text-sm text-gray-400'>Online</p>
                </div>
            </div>
        </div>
    )
}

export default ChatHeader