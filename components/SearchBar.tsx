import { Product } from '@/types'
import { FC, useState } from 'react'
import { Input } from './ui/input'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface SearchBarProps {
    Products: Product[]
}

const SearchBar: FC<SearchBarProps> = ({ Products }) => {
    const [search, setSearch] = useState('');
    return <div className='realtive w-96'>
        <Input onChange={(e) => setSearch(e.target.value)} className='w-96 font-medium' placeholder='Search...' />
        <div className='absolute top-16 z-40'>
            {
                search && (
                    <ScrollArea className="h-64 w-96 bg-white rounded-md border  z-40">
                        <div className="p-4">
                            {
                                Products?.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase())).map(({ name, _id }) => (

                                    <>
                                        <div key={_id} className="text-sm cursor-pointer">
                                            <p >{name}</p>
                                        </div>
                                        <Separator className="my-2" />
                                    </>
                                ))

                            }
                        </div>
                    </ScrollArea>
                )
            }
        </div>
    </div>
}

export default SearchBar