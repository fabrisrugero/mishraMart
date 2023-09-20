import { createContext, useState } from 'react'
import { nanoid } from 'nanoid'
import { FileDataMessage } from '@/lib/validators/file'

const defaultValue = [
    {
        id: nanoid(),
        isUserMessage: false,
        data: 'Hello, how can I help you?',
    },
]
export const FileDataMessagesContext = createContext<{
    messages: FileDataMessage[]
    isMessageUpdating: boolean
    addMessage: (message: FileDataMessage) => void
    removeMessage: (id: string) => void
    updateMessage: (id: string, updateFn: (prevText: string) => string) => void
    setIsMessageUpdating: (isUpdating: boolean) => void
}>({
    messages: [],
    isMessageUpdating: false,
    addMessage: () => { },
    removeMessage: () => { },
    updateMessage: () => { },
    setIsMessageUpdating: () => { },
})

export function FileDataMessagesProvider({ children }: { children: React.ReactNode }) {
    const [messages, setMessages] = useState(defaultValue)
    const [isMessageUpdating, setIsMessageUpdating] = useState<boolean>(false)

    const addMessage = (message: any) => {
        setMessages((prev) => [...prev, message])
    }

    const removeMessage = (id: string) => {
        setMessages((prev) => prev.filter((message) => message.id !== id))
    }

    const updateMessage = (
        id: string,
        updateFn: (prevText: string) => string
    ) => {
        setMessages((prev) =>
            prev.map((message) => {
                if (message.id === id) {
                    return { ...message, data: updateFn(message.data) }; // Update 'data' property
                }
                return message;
            })
        );
    }

    return (
        <FileDataMessagesContext.Provider
            value={{
                messages,
                isMessageUpdating,
                addMessage,
                removeMessage,
                updateMessage,
                setIsMessageUpdating,
            }}>
            {children}
        </FileDataMessagesContext.Provider>
    )
}