import { Sheet, SheetClose, SheetContent, SheetHeader } from "../ui/sheet"
import MobileNavItem from "./MobileNavItem"
import { TfiClose } from "react-icons/tfi";


const MobileNav = ({ isOpen, setIsOpen }) => {

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
                        {["New", "Curated", "Designers", "Clothing", "Shoes & Bags", "Accessories", "Login", "Pricing"].map((item, index) => (
                            <div key={item} onClick={() => { setIsOpen(false) }} className="">

                                <MobileNavItem index={index} label={item} link={'/collection/apple'} />
                            </div>
                        ))}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}


export default MobileNav