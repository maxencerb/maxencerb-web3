import type { Token } from '@/types/tokens'
import React from 'react'
import { TextInput } from '@/components/utils/input'
import { useTextInputController } from '@/hooks/useInputController'
import { useTokenSearch } from '@/hooks/useTokenList'

type TokenLineProps = {
    token: Token
}

type TokenTableProps = {
    tokens: Token[]
}

export function TokenLine({ token }: TokenLineProps) {
    return (
        <div className='flex items-center justify-between cursor-pointer hover:bg-white hover:bg-opacity-30 transition duration-75 ease-in-out py-2 px-4'>
            <div className='flex space-x-2 items-center'>
                <div>
                    {token.logoURI ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={token.logoURI}
                            alt={token.name}
                            className='h-10'
                        />
                    ) : (
                        <div
                            className='h-10 aspect-square bg-gray-400 rounded-full border-2 border-c-lighter'
                        />
                    )}
                </div>
                <div className='flex flex-col justify-center'>
                    <div className=''>
                        {token.name}
                    </div>
                    <div className='font-light opacity-70'>{token.symbol}</div>
                </div>
                
            </div>
            <div>0.00</div>
        </div>
    )
}

export function TokenTable({ tokens }: TokenTableProps) {

    const { controller, value } = useTextInputController({
        placeholder: 'Search by name or address'
    })

    const tokenResult = useTokenSearch(tokens, value)

    return (
        <div className='w-full relative'>
            <div className='sticky top-0 p-4 bg-black z-10 bg-opacity-70 backdrop-blur-md shadow-md border-b border-c-lighter space-y-2'>
                <div className='font-semibold'>Select a token</div>
                <div className='w-full flex items-center space-x-4'>
                    <TextInput className='flex-grow' controller={controller}/>
                </div>
            </div>
            {tokenResult.map(token => (
                <TokenLine
                    token={token}
                    key={token.address}
                />
            ))}
        </div>
    )
}