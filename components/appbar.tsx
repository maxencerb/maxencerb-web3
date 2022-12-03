import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'
import React from 'react'

export default function AppBar() {
    return (
        <nav className='flex justify-between p-4 items-center sticky top-0 left-0 w-full drop-shadow-md bg-black bg-opacity-80 backdrop-blur-sm z-50'>
            <Link href='/'>
                <div className='font-bold text-lg sm:hidden'>Web3 Impl.</div>
                <div className='font-bold text-lg hidden sm:block'>Web3 Implementations</div>
            </Link>
            <div>
                <ConnectButton/>
            </div>
        </nav>
    )
}
