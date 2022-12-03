import React, { createContext, useContext, useState } from 'react'

type PortalProps = {
    setPortal: (component: React.ReactNode) => void,
    onClose: () => void,
    isOpen: boolean
}

const portalContext = createContext<PortalProps>({
    setPortal: () => {},
    onClose: () => {},
    isOpen: false
})

type PortalProviderPros = {
    children: React.ReactNode
}

export default function PortalProvider({ children }: PortalProviderPros) {
    
    const [portalContent, setPortalContent] = useState<React.ReactNode>();

    const setPortal = (content: React.ReactNode) => {
        setPortalContent(content)
    }

    const onClose = () => {
        setPortalContent(undefined)
    }
    
    return (
        <portalContext.Provider value={{
            isOpen: !!portalContent,
            setPortal,
            onClose
        }}>
            {children}
        </portalContext.Provider>
    )
}

const usePortal = () => {
    const context = useContext(portalContext)
    return context
}

export {
    usePortal
}