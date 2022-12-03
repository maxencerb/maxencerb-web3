import '@rainbow-me/rainbowkit/styles.css';
import {
    darkTheme,
    getDefaultWallets
} from '@rainbow-me/rainbowkit';
import {
    chain,
    configureChains,
    createClient,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { lighter, neutral } from '@/constants/colors';

const { chains, provider } = configureChains(
    [chain.polygon],
    [
      alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID as string }),
      publicProvider()
    ]
);

const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    chains
});

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
})

const rainbowKitTheme = darkTheme({
    accentColor: neutral,
    accentColorForeground: lighter,
    borderRadius: "medium",
    
})
  
export {
    chains,
    wagmiClient,
    rainbowKitTheme
}