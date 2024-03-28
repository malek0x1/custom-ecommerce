import Link from 'next/link'
import MobileNav from './MobileNav'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { useEcommerceContext } from '@/lib/context/context'
import Skeleton from 'react-loading-skeleton'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { First_Issential_NAVIGATION, LoggedInNavigations, LoggedOutNavigations, Rest_DEMO_NAVIGATION } from '@/lib/data'

const Navbar = ({ setIsCartOpened, setIsSearchOpened }) => {
    const session = useSession()

    const { isMobileNavOpen, setIsMobileNavOpen, categories } = useEcommerceContext()
    return (
        <div className=''>
            <MobileNav isOpen={isMobileNavOpen} setIsOpen={setIsMobileNavOpen} />
            <div className="bg-white sm:px-10 container w-full p-2  sm:p-2 flex justify-between items-center ">
                <div className="sm:w-0 sm:overflow-hidden block sm:hidden">
                    <Image
                        src="/assets/icons/hamburger.svg"
                        unoptimized
                        width={25}
                        height={25}
                        alt="asd"
                        onClick={() => {
                            setIsMobileNavOpen(prev => !prev)
                        }} />
                </div>

                <div className="flex-1 justify-center sm:justify-normal flex">
                    <Link prefetch={false} href="/">
                        <Image unoptimized
                            loading='eager'

                            alt="logo" className='' src="/assets/images/logo.png" width="150" height="69" />
                    </Link>
                </div>
                <div
                    style={{ flex: "2" }}
                    className="justify-center hidden sm:flex-1 sm:flex  p-2 items-center gap-3">
                    <HoverCard openDelay={3} >
                        <HoverCardTrigger className=''>
                            <p
                                style={{
                                    fontSize: '13px'
                                }}
                                className='p-2 nav-link text-black font-light uppercase tracking-wider text-xs cursor-pointer'>
                                Shop

                            </p>

                        </HoverCardTrigger>
                        <HoverCardContent href="#ad" className="p-0 ml-10">
                            <div className="grid gap-1 p-3">
                                {!categories.loading ? categories.categories.map(item => (
                                    <Link prefetch={false} key={item.id} href={`/collection/${item.slug}`} className='p-2 text-xs text-gray-700'>
                                        {item.name}
                                    </Link>
                                )) :
                                    (
                                        <Skeleton className="gap-10" duration={0.8} count={8} height={20} />
                                    )}
                            </div>
                        </HoverCardContent>
                    </HoverCard>

                    {[...First_Issential_NAVIGATION, ...Rest_DEMO_NAVIGATION, ...(session.status === "authenticated" ? LoggedInNavigations : LoggedOutNavigations)].map(item => {
                        return (
                            <Link key={item.id} prefetch={false} href={`${item.slug}`}
                                style={{
                                    fontSize: "13px"
                                }}
                                className='nav-link p-2 text-black font-light uppercase tracking-wider'>
                                {item.name}
                            </Link>
                        )
                    })
                    }
                </div>
                <div className="flex items-center gap-1 sm:flex-1 justify-end">
                    <Image
                        src="/assets/icons/search.svg"
                        unoptimized
                        alt="asd"
                        width={25}
                        height={25}
                        onClick={() => {
                            if (setIsSearchOpened) {
                                setIsSearchOpened(true)
                            }
                        }}
                    />
                    <Image
                        src="/assets/icons/cart.svg"
                        unoptimized
                        width={20}
                        alt="icon"
                        className='object-cover'
                        height={20}
                        onClick={() => {
                            setIsCartOpened(prev => !prev)
                        }} />
                </div>
            </div>
        </div>
    )
}

export default Navbar