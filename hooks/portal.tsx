import React, { createContext, useContext, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Transition } from 'framer-motion'

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

const transitionProps: Transition = {
    type: "tween",
    duration: .2
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
            <AnimatePresence>
                {portalContent && (
                    <motion.div
                        className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-75 z-50'
                        initial={{
                            opacity: 0
                        }}
                        animate={{
                            opacity: 1
                        }}
                        exit={{
                            opacity: 0
                        }}
                        onClick={onClose}
                        key="portal-outer-container"
                        transition={transitionProps}
                    >
                        <motion.div
                            key="portal-inner-container"
                            className='w-full h-full flex items-center justify-center'
                            initial={{
                                y:50
                            }}
                            animate={{
                                y:0
                            }}
                            exit={{
                                y:50
                            }}
                            transition={transitionProps}
                        >
                            {portalContent}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
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