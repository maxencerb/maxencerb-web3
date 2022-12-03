import React from 'react'
import Link from 'next/link'

type LinkProps = {
    href: string,
    newTab?: boolean,
    children: React.ReactNode,
}

export function SimpleLink({ href, newTab, children }: LinkProps) {
    return (
        <Link 
            href={href} 
            target={newTab ? '_blank' : undefined}
            className="decoration-dotted underline underline-offset-4 opacity-80 hover:opacity-100"
        >
            {children}
        </Link>
    )
}
