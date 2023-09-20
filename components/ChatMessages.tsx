"use client"

import { MessagesContext } from '@/context/messages'
import { cn } from '@/lib/utils'
import { FC, HTMLAttributes, useContext } from 'react'
import MarkdownLite from './MarkdownLite'
import Image from 'next/image'

interface ChatMessagesProps extends HTMLAttributes<HTMLDivElement> {

}

const ChatMessages: FC<ChatMessagesProps> = ({ className, ...props }) => {
    const { messages } = useContext(MessagesContext)
    const inverseMessages = [...messages].reverse()
    return <div {...props} className={cn(
        'flex flex-col-reverse gap-3 overflow-y-auto scrollbar-thumb-green scrollbar-thumb-rounded scrollbar-track-green-lighter scrollbar-w-2 scrolling-touch',
        className
    )} >
        <div className='flex-1 flex-grow' />
        {inverseMessages.map((message) => (
            <div key={message.id} className='chat-message'>
                <div className={cn('flex items-end', {
                    'justify-end': message.isUserMessage,
                })}>
                    <div className={cn('flex flex-col space-y-2 text-sm max-w-xs mx-2 overflow-x-hidden', {
                        'order-1 items-end': message.isUserMessage,
                        'order-2 items-start': !message.isUserMessage,
                    })}>
                        <p className={cn('px-4 py-2 items-center rounded-lg flex gap-x-2 ', {
                            'bg-green-200 , text-gray-900 font-medium': message.isUserMessage,
                            'bg-green-50 text-gray-900 font-medium': !message.isUserMessage,
                        })}>
                            <Image
                                src={message.isUserMessage ? '/avatar.jpg' : '/logo.png'}
                                alt='logo'
                                width={30}
                                height={30}
                                className=' flex rounded-full object-contain'
                            />
                            <MarkdownLite text={message.text} />
                        </p>

                    </div>
                </div>
            </div>
        ))
        }
    </div>
}

export default ChatMessages