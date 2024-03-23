import { useEcommerceContext } from "@/lib/context/context";
import { Sheet, SheetClose, SheetContent, SheetHeader } from "../ui/sheet"
import MobileNavItem from "./MobileNavItem"
import { TfiClose } from "react-icons/tfi";
import Skeleton from "react-loading-skeleton";


const MobileNav = ({ isOpen, setIsOpen }) => {
    const { categories } = useEcommerceContext()

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen} >
            <SheetContent side="left" className="mobileNavbar flex flex-col ">
                <SheetHeader className="text-left">
                    <SheetClose className="w-fit" >
                        <TfiClose size={20} />
                    </SheetClose>
                </SheetHeader>
                <div className="overflow-y-auto flex-1">
                    <div className="space-y-2 pt-8">
                        {
                            !categories.loading ?
                                categories.categories.length > 0 && categories.categories.map((item, index) => (
                                    <div key={item.id} onClick={() => { setIsOpen(false) }} className="">
                                        <MobileNavItem index={index} label={item.name} link={`/collection/${item.slug}`} />
                                    </div>
                                ))
                                :
                                <Skeleton className="gap-5" duration={0.8} count={8} height={20} />
                        }

                        {!categories.loading && ["/login", "/sign-up", "/logout"].map((item, index) => (
                            <div key={item} onClick={() => { setIsOpen(false) }} className="">
                                <MobileNavItem index={index} label={item} link={`${item}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}


export default MobileNav