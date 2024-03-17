import { Button } from "@/components/ui/button"
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


const Cart = ({ isOpen, setIsOpen }) => {
    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            {/* <SheetTrigger asChild>
                <Button variant="outline">Open</Button>
            </SheetTrigger> */}
            <SheetContent className="w-full flex flex-col ">
                <SheetHeader className="text-left">
                    <SheetTitle>Cart</SheetTitle>
                    <SheetDescription>
                        Empty Cart
                    </SheetDescription>
                </SheetHeader>

                <div className="overflow-y-auto flex-1">
                    <div className="grid gap-4 py-4 ">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
                            <CartItem key={item} />
                        ))}
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button className="w-full" type="submit">Checkout</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default Cart