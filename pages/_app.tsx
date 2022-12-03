import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Web3Wrapper from '@/components/web3-wrapper'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Web3Wrapper>
            <Component {...pageProps} />
        </Web3Wrapper>
    )
}
