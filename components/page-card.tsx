import React from 'react'
import Card from './utils/card'
import Link from 'next/link'

type PageCardProps = {
    title: string,
    sectionId?: string,
    subtitle: string,
    disabled?: boolean
}

export default function PageCard({ title, sectionId, subtitle, disabled }: PageCardProps) {
    return (
        <Link href={`/${disabled ? '' : (sectionId || '')}`}>
            <Card className={`p-4 w-52 max-w-full space-y-4 cursor-pointer ${disabled ? '' : 'hover:scale-105'} transition-all duration-150 ease-in-out aspect-video flex items-center justify-center`}>
                <div className={disabled ? "opacity-80" : ""}>
                    <h2 className='text-center font-bold'>{title}</h2>
                    <h3 className='text-center font-light text-sm'>{subtitle}</h3>
                </div>
            </Card>
       </Link>
    )
}
