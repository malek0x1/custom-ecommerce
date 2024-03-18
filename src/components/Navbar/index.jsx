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

const Navbar = ({ setIsCartOpened, setIsSearchOpened }) => {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
    return (
        <div className=''>
            <MobileNav isOpen={isMobileNavOpen} setIsOpen={setIsMobileNavOpen} />
            <div className="bg-white container w-full p-2  sm:p-4 flex justify-between items-center">
                <div className="sm:w-0 sm:overflow-hidden block">
                    <CiMenuFries size={20} onClick={() => {
                        setIsMobileNavOpen(prev => !prev)
                    }} />
                </div>
                <div className="">
                    <Image className='' src="/assets/images/logo.png" width="150" height="150" />
                </div>
                <div className="flex items-center gap-1">
                    <CiSearch size={20}
                        onClick={() => {
                            if (setIsSearchOpened) {
                                setIsSearchOpened(true)
                            } else {
                                alert("NO")
                            }
                        }}
                    />
                    <CiShoppingCart size={20} onClick={() => {
                        setIsCartOpened(prev => !prev)
                    }} />
                </div>
            </div>
            <div className=" hidden sm:flex border-b border-b-gray-100   overflow-x-auto p-2 w-full items-center  justify-center gap-3">
                {/* <HoverCard openDelay={3}>
                    <HoverCardTrigger>Hover</HoverCardTrigger>
                    <HoverCardContent className="p-0">
                        <div className="grid gap-1">
                            {["New", "Curated", "Designers", "Clothing", "Shoes & Bags", "Accessories"].map(item => (
                                <Link key={item} href="#" className='p-2 text-xs text-gray-700'>
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </HoverCardContent>
                </HoverCard> */}
                {["Home", "Shop", "About us", "Contact us"].map(item => (
                    <Link key={item} href="#" className='p-2 text-xs text-gray-700 uppercase tracking-wider'>
                        {item}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Navbar