import { usePortal } from '@/hooks/portal'
import React from 'react'

export type PortalComponent = (onClose: () => void) => React.ReactNode

export type TriggerComponent = (onPress: () => void) => React.ReactNode

export type PortalTriggerProps = {
    children: [TriggerComponent, PortalComponent]
}

export default function PortalTrigger({ children }: PortalTriggerProps) {
    
    const { setPortal, onClose } = usePortal()

    return (
        <>
            {children[0](() => setPortal(children[1](onClose)))}
        </>
    )
}
