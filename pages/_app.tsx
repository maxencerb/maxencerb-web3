import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Web3Wrapper from '@/components/web3-wrapper'
import { SWRConfig } from 'swr'

export default function App({ Component, pageProps }: AppProps) {
    return (
        // <SWRConfig>
            <Web3Wrapper>
                <Component {...pageProps} />
            </Web3Wrapper>
        // </SWRConfig>
    )
}
