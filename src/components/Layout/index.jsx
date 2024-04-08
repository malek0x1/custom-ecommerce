import { Gideon_Roman } from "next/font/google";
import MetaData from "../MetaData/index";
import { useEcommerceContext } from "../../lib/context/context";
import Footer from "../Footer";
import dynamic from "next/dynamic";
import AnnouncementBar from "../AnnouncementBar";
import Cart from "../Cart";
import { useEffect, useState } from "react";
import { getSettings } from "@/lib/helpers";
import Spinner from "../Spinner";
import Skeleton from "react-loading-skeleton";

const font = Gideon_Roman({ subsets: ["latin"], weight: "400" });
const Search = dynamic(() => import("@/components/Search"));
const Navbar = dynamic(() => import("@/components/Navbar"));

const Layout = ({ title, description, keywords, children, isFooter = true, isHeader = true }) => {
    const {
        isSearchOpened,
        setIsSearchOpened,
        isCartOpened,
        setIsCartOpened
    } = useEcommerceContext()
    const [settings, setSettings] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const handleSettings = async () => {
            const res = await getSettings()
            setSettings(res)
            console.log(res);
            setIsLoading(false)
        }
        handleSettings()
    }, [])

    return (
        <>
            <MetaData
                description={description}
                keywords={keywords}
                title={title}
            />
            <main className={`flex flex-col w-full min-h-screen ${font.className}`}>
                <Cart isOpen={isCartOpened} setIsOpen={setIsCartOpened} />
                <Search isOpen={isSearchOpened} setIsOpen={setIsSearchOpened} />

                {isHeader && isLoading ? <Skeleton duration={0.8} count={1} height={33} className="w-full m-0" containerClassName="flex" /> :
                    settings.announcement && <AnnouncementBar message={settings.announcement} />}

                {isHeader && (

                    <Navbar setIsCartOpened={setIsCartOpened} setIsSearchOpened={setIsSearchOpened} />
                )}
                <div className="flex-1 w-full">
                    {children}
                </div>
                {isFooter && <Footer isSettingsLoading={isLoading} settings={settings} />}
            </main>
        </>
    )
}

export default Layout