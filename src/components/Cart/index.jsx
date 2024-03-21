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
import { useEcommerceContext } from "@/lib/context/context"
import Skeleton from "react-loading-skeleton"


const Cart = ({ isOpen, setIsOpen }) => {
    const { cartItems } = useEcommerceContext()

    console.log(cartItems);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen} >
            <SheetContent className="w-full flex flex-col ">
                <SheetHeader className="text-left">
                    <SheetTitle>Cart</SheetTitle>
                    {!cartItems.loading && cartItems.line_items.length == 0 && (
                        <SheetDescription>
                            Empty Cart
                        </SheetDescription>
                    )}
                </SheetHeader>

                <div className="overflow-y-auto flex-1">
                    <div className="grid gap-4 py-4 ">
                        {
                            cartItems.loading ? <Skeleton duration={0.7} className="w-full mb-2" height={100} count={2} /> : cartItems.line_items.length > 0 && cartItems.line_items.map((item, index) => (
                                <CartItem id={item.id} key={`${item}-${JSON.stringify(item.selected_options)}`} selected_options={item.selected_options} image={item.image.url} index={index} price={item.price.formatted_with_symbol} title={item.name} quantity={item.quantity} />
                            ))
                        }
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        {!cartItems.loading && cartItems.line_items.length != 0 && (
                            <Button className="w-full bg-black" type="submit" label="Checkout" />
                        )}
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default Cart