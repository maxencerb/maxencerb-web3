import React, { createContext, useContext, useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { AiFillInfoCircle, AiFillCloseCircle, AiFillCheckCircle } from 'react-icons/ai'
import { motion, AnimatePresence } from 'framer-motion'

type Notification = {
    title?: string,
    content: string,
    type?: "default" | "error" | "success" | "loading",
    time?: number
}

type NotificationAndInformations = Notification & {
    id: string,
    last_action_timestamp: number,
    isClosed: boolean
}

type NotificationsContextProps = {
    push: (notification: Notification) => string,
    clear: () => void,
    kill: (id: string) => void,
    modify: (id: string, notification: Partial<Notification>) => void
}

const defaultValue = {
    push: () => "",
    clear: () => {},
    kill: () => {},
    modify:  () => {}
}

const NotificationsContext = createContext<NotificationsContextProps>(defaultValue)

type NotificationsProviderProps = {
    children: React.ReactNode
}

const DEFAULT_DURATION = 2500;

type NotificationProps = NotificationAndInformations

function NotificationComponent(props: NotificationProps) {

    const [isVisible, setIsVisible] = useState(false);

    const time = props.time || DEFAULT_DURATION

    useEffect(() => {
        if (Date.now() > time + props.last_action_timestamp) return;
        setIsVisible(true)
        const timeout = setTimeout(() => setIsVisible(false), time)
        return () => {
            clearTimeout(timeout)
        }
    }, [props.last_action_timestamp, props.time])

    const { type, title, content } = props

    if (!isVisible || props.isClosed) return <></>

    return (
        <motion.div className='w-screen max-w-full rounded-lg bg-gray-900 shadow-md p-4 text-md flex space-x-2'>
            {type === "loading" && (
                <div role="status" className='m-auto'>
                    <svg aria-hidden="true" className="w-6 h-6 animate-spin fill-c-dark" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            )}
            <div className='flex-grow'>
                {title && (
                    <div className={`font-semibold flex items-center space-x-2 ${type === "error" ? "text-red-500" : type === "success" ? "text-green-500" : ""}`}>
                        {type === "default" && (<AiFillInfoCircle/>)}
                        {type === "error" && (<AiFillCloseCircle/>)}
                        {type === "success" && (<AiFillCheckCircle/>)}
                        <div className='first-letter:uppercase'>{title}</div>
                    </div>
                )}
                <div className='text-sm'>
                    {content}
                </div>
            </div>
            <div>
                <button className='bg-gray-700 p-2 rounded-full text-gray-400 hover:bg-gray-600 transition' onClick={() => {setIsVisible(false)}}>
                    <RxCross2/>
                </button>
            </div>
        </motion.div>
    )
}

export default function NotificationsProvider({ children }: NotificationsProviderProps) {
    
    // TODO: find a better way for better memory management
    const [ notifications, setNotifications ] = useState<NotificationAndInformations[]>([])

    const push = (notification: Notification) => {
        const id = `${Math.random()}-${Date.now()}`;
        setNotifications((prev) => [
            ...prev,
            {
                ...notification,
                id,
                last_action_timestamp: Date.now(),
                isClosed: false,
                type: notification.type || "default"
            }
        ]);
        return id;
    }

    const clear = () => {
        setNotifications((prev) => prev.map(val => ({
            ...val,
            isClosed: true
        })))
    }

    const kill = (id: string) => {
        setNotifications((prev) => prev.map((val) => {
            if (val.id !== id) return val;
            return {
                ...val,
                isClosed: true
            } 
        }))
    }

    const modify = (id: string, notification: Partial<Notification>) => {
        setNotifications((prev) => prev.map((val) => {
            if (val.id !== id) return val;
            return {
                ...val,
                ...notification,
                last_action_timestamp: Date.now()
            } 
        }))
    }

    return (
        <NotificationsContext.Provider value={{
            push,
            clear,
            kill,
            modify
        }}>
            {children}
            <div className='fixed bottom-0 right-0 space-y-2 max-w-sm p-2 z-[51]'>
                <AnimatePresence>
                    {notifications.map(notif => (
                        <NotificationComponent
                            {...notif}
                            key={notif.id}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </NotificationsContext.Provider>
    )
}

export function useNotifications() {
    const context = useContext(NotificationsContext)
    return context
}