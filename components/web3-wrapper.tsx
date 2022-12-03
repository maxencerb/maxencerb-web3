import React from 'react'
import type { ReactNode } from 'react'
import { chains, rainbowKitTheme, wagmiClient } from '@/config/rainbowkit'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiConfig } from 'wagmi'

type WrapperProps = {
    children: ReactNode
}

export default function Web3Wrapper({ children }: WrapperProps) {
    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains} theme={rainbowKitTheme}>
                {children}
            </RainbowKitProvider>
        </WagmiConfig>
    )
}
