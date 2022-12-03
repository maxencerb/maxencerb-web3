import type { Token } from '@/types/tokens'
import React, { useState } from 'react'
import { TextInput } from '@/components/utils/input'
import { useTextInputController } from '@/hooks/useInputController'
import { POLYGON_TOKEN_LIST_KEY_LOCAL, useTokenSearch } from '@/hooks/useTokenList'
import { importToken, isEthAdress, truncateAddress } from '@/utils/token'
import { Button, IconButton } from '../utils/button'
import { useSWRConfig } from 'swr'
import { DialogTrigger } from '../utils/dialog'
import { useToken } from 'wagmi'
import { formatUnits } from 'ethers/lib/utils'
import { useBalances } from '@/hooks/useBalances'
import type { BigNumber } from 'ethers'
import { MdOutlineContentCopy } from 'react-icons/md'


type TokenLineProps = {
    token: Token
    balance?: BigNumber
}

type TokenTableProps = {
    tokens: Token[]
}

type TokenInformationProps = {
    onClose?: () => void,
    token: Token,
    balance?: BigNumber
} 

export function TokenInformation({ onClose, token, balance }: TokenInformationProps) {
    const { data, error, refetch, isLoading } = useToken({
        address: token.address,
        chainId: token.chainId
    })

    if (isLoading) {
        return <div className='w-full h-16 animate-pulse bg-gray-700 rounded-md'/>
    }

    if (error) {
        return (
            <div className='w-full h-16 flex items-center justify-center'>
                There was an error while fetching your data : {error.message}
            </div>
        )
    }

    const totalSupply = parseFloat(
        formatUnits(data?.totalSupply.value || 0, data?.decimals || 0)
    ).toLocaleString()

    const parsedBalance = parseFloat(
        formatUnits(balance || 0, token.decimals || 0)
    ).toLocaleString()
        

    return (
        <div className='space-y-4'>
            <div className='space-y-2 text-sm'>
                <div className='w-full flex justify-between items-center opacity-80'>
                    <div className='font-semibold'>Contract</div>
                    <div className='flex items-center space-x-2'>
                        <div>{truncateAddress(token.address)}</div>
                        <IconButton onPress={() => {
                            navigator.clipboard.writeText(token.address)
                        }}>
                            <MdOutlineContentCopy/>
                        </IconButton>
                    </div>
                </div>
                <div className='w-full flex justify-between items-center opacity-80'>
                    <div className='font-semibold'>Total Supply</div>
                    <div>{totalSupply} <span className='text-xs font-light opacity-80'>{data?.symbol}</span></div>
                </div>
                <div className='w-full flex justify-between items-center opacity-80'>
                    <div className='font-semibold'>Balance</div>
                    <div>{parsedBalance} <span className='text-xs font-light opacity-80'>{data?.symbol}</span></div>
                </div>
            </div>
            
        </div>
    )
}

export function TokenLine({ token, balance }: TokenLineProps) {

    const [imageError, setImageError] = useState(false)

    const parsedBalance = parseFloat(
        formatUnits(balance || 0, token.decimals || 0)
    ).toLocaleString()

    return (
        <DialogTrigger
            size='md'
            title={token.name}
        >
            {(onPress) => (
                <div className='flex items-center justify-between cursor-pointer hover:bg-white hover:bg-opacity-30 transition duration-75 ease-in-out py-2 px-4' onClick={onPress}>
                    <div className='flex space-x-2 items-center'>
                        <div>
                            {token.logoURI && !imageError ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={token.logoURI}
                                    alt={token.name}
                                    className='h-10'
                                    onError={() => {
                                        setImageError(true)
                                    }}
                                />
                            ) : (
                                <div
                                    className='h-10 aspect-square bg-c-dark rounded-full border-2 border-c-lighter text-xs flex items-center justify-center overflow-hidden'
                                >
                                    {token.symbol}
                                </div>
                            )}
                        </div>
                        <div className='flex flex-col justify-center'>
                            <div className=''>
                                {token.name}
                            </div>
                            <div className='font-light opacity-70'>{token.symbol}</div>
                        </div>
                        
                    </div>
                    <div>{parsedBalance}</div>
                </div>
            )}
            {(onClose) => (
                <TokenInformation
                    onClose={onClose}
                    token={token}
                    balance={balance}
                />
            )}
        </DialogTrigger>
    )
}

export function TokenTable({ tokens }: TokenTableProps) {

    const { controller, value } = useTextInputController({
        placeholder: 'Search by name or address'
    })

    const balances = useBalances(tokens.map(t => t.address));

    const tokenResult = useTokenSearch(tokens, value, balances)

    const isSearchAddress = isEthAdress(value)

    const { mutate } = useSWRConfig()

    return (
        <div className='w-full relative'>
            <div className='sticky top-0 p-4 bg-black z-10 bg-opacity-70 backdrop-blur-md shadow-md border-b border-c-lighter space-y-2'>
                <div className='font-semibold'>Select a token</div>
                <div className='w-full flex items-center space-x-4'>
                    <TextInput className='flex-grow' controller={controller} isSearch/>
                </div>
            </div>
            {tokenResult.length ? tokenResult.map(token => (
                <TokenLine
                    token={token}
                    key={token.address}
                    balance={balances[token.address.toLowerCase()]}
                />
            )) : (
                <div className='w-full flex items-center flex-col p-4 space-y-4'>
                    <div className='font-semibold'>No token Found</div>
                   {isSearchAddress && (
                        <Button onPress={async () => {
                            importToken(value, () => {
                                    mutate(POLYGON_TOKEN_LIST_KEY_LOCAL)
                            })
                        }}>
                            Import Token
                        </Button>
                   )} 
                </div>
            )}
        </div>
    )
}