"use client"

import Link from 'next/link'
import FileForm from './FileForm'
import React, { useState } from 'react'
import Image from 'next/image'
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import SearchBar from './SearchBar';


const Navbar = () => {

    const [search, setSearch] = useState('');
    const Products = useQuery(api.collection.getProducts);

    return <header className='px-4 py-2'>
        <nav className='p-2 flex items-center gap-x-32'>
            <Link href={"/"}>
                <div className='flex  items-center'>
                    <Image
                        src={'/logo.png'}
                        alt='logo'
                        width={40}
                        height={40}
                    />
                    <p className='font-bold text-green-700 text-2xl'>SuperMart</p>
                </div>
            </Link>
            <SearchBar Products={Products} setSearch={setSearch} />
            <FileForm />
        </nav>
    </header>
}

export default Navbar