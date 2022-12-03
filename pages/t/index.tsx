import AppBar from '@/components/appbar'
import { TokenTable } from '@/components/t/tokens'
import Card from '@/components/utils/card'
import { usePolygonTokenList } from '@/hooks/useTokenList'
import React from 'react'

export default function Tools() {

    const { tokens, isLoading } = usePolygonTokenList()

    return (
        <>
            <AppBar/>
            <div className='w-full flex justify-center p-4'>
                <div className='w-full max-w-lg space-y-4'>
                    <Card variant='filled' className='h-[80vh] overflow-auto'>
                        {isLoading || !tokens ? (
                            <div>loading</div>
                        ) : (
                            <TokenTable
                                tokens={tokens}
                            />
                        )}
                    </Card>
                </div>
            </div>
        </>
    )
}