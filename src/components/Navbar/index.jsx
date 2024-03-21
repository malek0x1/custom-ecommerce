import Image from 'next/image'
import { useState } from 'react'
import { CiSearch, CiShoppingCart } from 'react-icons/ci'
import Link from 'next/link'
import { CiMenuFries } from "react-icons/ci"
import MobileNav from './MobileNav'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { useEcommerceContext } from '@/lib/context/context'


const Navbar = ({ setIsCartOpened, setIsSearchOpened }) => {
    const { isMobileNavOpen, setIsMobileNavOpen } = useEcommerceContext()
    return (
        <div className=''>
            <MobileNav isOpen={isMobileNavOpen} setIsOpen={setIsMobileNavOpen} />
            <div className="bg-white sm:px-10 container w-full p-2  sm:p-2 flex justify-between items-center ">
                <div className="sm:w-0 sm:overflow-hidden block sm:hidden">
                    <CiMenuFries size={20} onClick={() => {
                        setIsMobileNavOpen(prev => !prev)
                    }} />
                </div>

                <div className="flex-1 justify-center sm:justify-normal flex">
                    <Link prefetch={false} href="/">
                        <Image unoptimized alt="logo" className='' src="/assets/images/logo.png" width="150" height="69" />
                    </Link>
                </div>
                <div className="justify-center hidden sm:flex-1 sm:flex overflow-x-auto p-2 items-center  gap-3">
                    {["Home", "Shop", "About us", "Contact us"].map(item => {

                        if (item !== "Shop") {
                            return (
                                <Link prefetch={false} key={item} href="#"
                                    style={{
                                        fontSize: "13px"
                                    }}
                                    className='nav-link p-2 text-black font-light uppercase tracking-wider'>
                                    {item}
                                </Link>
                            )
                        } else {
                            return (
                                <HoverCard key={item} openDelay={3} >
                                    <HoverCardTrigger className=''>
                                        <p
                                            style={{
                                                fontSize: '13px'
                                            }}
                                            className='p-2 nav-link text-black font-light uppercase tracking-wider text-xs cursor-pointer'>
                                            {item}

                                        </p>

                                    </HoverCardTrigger>
                                    <HoverCardContent className="p-0 ml-10">
                                        <div className="grid gap-1 p-3">
                                            {["New", "Curated", "Designers", "Clothing", "Shoes & Bags", "Accessories"].map(item => (
                                                <Link prefetch={false} key={item} href="/collection/apple" className='p-2 text-xs text-gray-700'>
                                                    {item}
                                                </Link>
                                            ))}
                                        </div>
                                    </HoverCardContent>
                                </HoverCard>
                            )
                        }
                    })
                    }
                </div>
                <div className="flex items-center gap-1 sm:flex-1 justify-end">
                    <CiSearch size={22}
                        onClick={() => {
                            if (setIsSearchOpened) {
                                setIsSearchOpened(true)
                            }
                        }}
                    />
                    <CiShoppingCart size={22} onClick={() => {
                        setIsCartOpened(prev => !prev)
                    }} />
                </div>
            </div>
        </div>
    )
}

export default Navbar