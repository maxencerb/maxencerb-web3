import React from 'react'
import { Button } from '../utils/button'
import { SimpleLink } from '../utils/link'

export default function Welcome() {
    return (
        <div className='w-full flex justify-center px-4 py-12'>
            <div className='max-w-xl w-full space-y-6'>
                <div className='text-center font-semibold text-xl'>Welcome to some Web3 implementations</div>
                <div>This is a simple project to tests web technologies around web3 with one or more implementations of DeFi protocol frontends/backends. Enjoy 🧑‍💻</div>
                <div>If you are interested in my work, you can visit my <SimpleLink href='https://github.com/maxencerb'>Github</SimpleLink> or my <SimpleLink href="https://maxencerb.com">Portfolio</SimpleLink>.</div>
            </div>
        </div>
    )
}
