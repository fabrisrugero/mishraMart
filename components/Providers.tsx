"use client"

import { MessagesProvider } from '@/context/messages'
import { FileDataMessagesProvider } from '@/context/fileDataMessage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC } from 'react'

interface ProvidersProps {
    children: React.ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) => {
    const queryClient = new QueryClient();
    return <QueryClientProvider client={queryClient}>
        <MessagesProvider>
            {children}
        </MessagesProvider>
    </QueryClientProvider>
}

export default Providers