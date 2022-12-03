import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Web3Wrapper from '@/components/web3-wrapper'
import PortalProvider from '@/hooks/portal'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Web3Wrapper>
            <PortalProvider>
                <Component {...pageProps} />
            </PortalProvider>
        </Web3Wrapper>
    )
}
