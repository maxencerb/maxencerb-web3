import React from 'react'
import Card from './card'
import PortalTrigger, { PortalTriggerProps } from './portal-trigger'
import { RxCross2 } from 'react-icons/rx'

type DialogProps = {
    children: React.ReactNode,
    onClose: () => void,
    size?: "sm" | "md" | "lg" | "xl",
    title?: string
}

export function Dialog({ children, onClose, size = "sm", title }: DialogProps) {
    
    // Classnames to include in code export
    const className="max-w-sm max-w-md max-w-lg max-w-xl"
    
    return (
        <div className={`p-4 w-screen max-w-${size} bg-opacity-100`}>
            <div className='w-full bg-gray-800 rounded-lg overflow-hidden '>
                <div className='w-full p-2 flex items-baseline justify-between border-b border-gray-500'>
                    <div className='pl-2 font-semibold text-lg'>
                        {title}
                    </div>
                    <button className='bg-gray-700 p-2 rounded-full text-gray-400 hover:bg-gray-600 transition' onClick={onClose}>
                        <RxCross2/>
                    </button>
                </div>
                <div className='p-4'>
                    {children}
                </div>
            </div>
        </div>
    )
}

type DialogTriggerProps = PortalTriggerProps & Omit<Omit<DialogProps, "onClose">, "children">

export function DialogTrigger(props: DialogTriggerProps) {

    const { children, ...dialogProps } = props

    return (
        <PortalTrigger>
            {children[0]}
            {(onClose) => (
                <Dialog onClose={onClose} {...dialogProps}>
                    {children[1](onClose)}
                </Dialog>
            )}
        </PortalTrigger>
    )
}