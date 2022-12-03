import { useContractReads, useAccount } from 'wagmi'
import ERC20_ABI from '@/constants/abi/erc20'
import type { BigNumber } from 'ethers'

export function useBalances(tokens: string[], chainId: number = 137) {
    
    const { address } = useAccount()

    const { data, isLoading } = useContractReads({
        contracts: tokens.map(token => ({
            address: address ? token : undefined,
            abi: ERC20_ABI,
            functionName: 'balanceOf',
            args: [address]
        }))
    })

    const balances = data as (BigNumber[] | undefined)
    if (isLoading || !balances) return {}
    
    return tokens.reduce<{[key: string]: BigNumber}>((prev, token) => {
        const idx = tokens.indexOf(token);
        return {
            ...prev,
            [token.toLowerCase()]: balances[idx]
        }
    }, {})
}