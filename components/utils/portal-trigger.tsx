import { usePortal } from '@/hooks/portal'
import React from 'react'

type PortalComponent = (onClose: () => void) => React.ReactNode

type TriggerComponent = (onPress: () => void) => React.ReactNode

type PortalTriggerProps = {
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
