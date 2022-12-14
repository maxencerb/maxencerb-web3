import AppBar from '@/components/appbar'
import Welcome from '@/components/intro/welcome'
import PageCard from '@/components/page-card'
import { Button } from '@/components/utils/button'
import { DialogTrigger } from '@/components/utils/dialog'
import PortalTrigger from '@/components/utils/portal-trigger'
import { usePortal } from '@/hooks/portal'

export default function Home() {

    const { setPortal } = usePortal()

    return (
        <>
            <AppBar/>
            <Welcome/>
            <div className='w-full flex justify-center'>
                <div className='p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center w-full max-w-5xl'>
                    <PageCard
                        sectionId='t'
                        title='Tokens'
                        subtitle='View and send your assets'
                    />
                    <PageCard
                        sectionId='test'
                        title='More to come'
                        subtitle='Some functionnality soon to be added'
                        disabled
                    />
                </div>
            </div>
           
            
            
        </>
    )
}
