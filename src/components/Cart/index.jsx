import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet"
import CartItem from "./CartItem"
import Button from "../Button"


const Cart = ({ isOpen, setIsOpen }) => {
    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen} >
            <SheetContent className="w-full flex flex-col ">
                <SheetHeader className="text-left">
                    <SheetTitle>Cart</SheetTitle>
                    <SheetDescription>
                        Empty Cart
                    </SheetDescription>
                </SheetHeader>

                <div className="overflow-y-auto flex-1">
                    <div className="grid gap-4 py-4 ">
                        {[1, 2, 3, 4].map((item, index) => (
                            <CartItem index={index} key={item} />
                        ))}
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button className="w-full bg-black" type="submit" label="Checkout" />
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default Cart