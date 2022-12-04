import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Web3Wrapper from '@/components/web3-wrapper'
import PortalProvider from '@/hooks/portal'
import NotificationsProvider from '@/hooks/notifications'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Web3Wrapper>
            <NotificationsProvider>
                <PortalProvider>
                    <Component {...pageProps} />
                </PortalProvider>
            </NotificationsProvider>
        </Web3Wrapper>
    )
}
