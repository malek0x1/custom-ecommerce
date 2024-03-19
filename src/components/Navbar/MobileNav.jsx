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
                            <MobileNavItem index={index} label={item} link={'/collection/apple'} key={item} />
                        ))}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}


// <Popover open={isOpen} onOpenChange={() => {
//     setIsOpen(false)
// }}>
//     <PopoverTrigger className="hidden">
//     </PopoverTrigger>
//     <PopoverContent className="w-screen h-screen">

//         <div className="flex w-full justify-end">
//             <Hamburger className="" size={20} toggled={isOpen} toggle={setIsOpen} />

//         </div>

//         <div className="grid gap-4 ">
//             <div className="space-y-2">
//                 {["New", "Curated", "Designers", "Clothing", "Shoes & Bags", "Accessories", "Login", "Pricing"].map(item => (
//                     <MobileNavItem label={item} link="#" key={item} />
//                 ))}
//             </div>
//         </div>
//     </PopoverContent>
// </Popover >


export default MobileNav