import Image from 'next/image'
import Hamburger from 'hamburger-react'
import { useState } from 'react'
import { CiSearch, CiShoppingCart } from 'react-icons/ci'
import Link from 'next/link'

const Navbar = ({ isCartOpened, setIsCartOpened }) => {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
    return (
        <div className=''>
            <div className="bg-white container w-full p-2  sm:p-4 flex justify-between items-center">
                <div className="sm:w-0 sm:overflow-hidden block">
                    <Hamburger className="" size={20} toggled={isMobileNavOpen} toggle={setIsMobileNavOpen} />
                </div>
                <div className="">
                    <Image src="/assets/images/logo.png" width="150" height="150" />
                </div>
                <div className="flex items-center gap-1">
                    <CiSearch size={20} />
                    <CiShoppingCart size={20} onClick={() => {
                        setIsCartOpened(prev => !prev)
                    }} />
                    <CiSearch size={20} />
                </div>
            </div>
            <div className="bg-gray-50 hidden sm:flex shadow-sm overflow-x-auto p-2 w-full  justify-center gap-3">
                {["New", "Curated", "Designers", "Clothing", "Shoes & Bags", "Accessories"].map(item => (
                    <Link key={item} href="#" className='p-2'>
                        {item}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Navbar