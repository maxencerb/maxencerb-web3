import React from 'react'
import type { ReactNode } from 'react'; 
import Link from 'next/link'

type ButtonProps = {
    children: ReactNode,
    href?: string,
    onPress?: () => void
}

export function Button({ children, href, onPress }: ButtonProps) {

    const className="rounded-md py-2 px-4 bg-c-dark drop-shadow-md transition duration-150 ease-in-out hover:scale-105"
    
    return href ? (
        <Link href={href} target='_blank'>
            <button className={className}>
                {children}
            </button>
        </Link>
    ) : (
        <button className={className} onClick={onPress}>
            {children}
        </button>
    )
}

export function IconButton({children, href, onPress}: ButtonProps) {
    
    const className="bg-white bg-opacity-0 transition hover:bg-opacity-40 p-2 rounded-md aspect-square flex items-center justify-center"
    
    return href ? (
        <Link href={href} target='_blank'>
            <button className={className}>
                {children}
            </button>
        </Link>
    ) : (
        <button className={className} onClick={onPress}>
            {children}
        </button>
    )
}