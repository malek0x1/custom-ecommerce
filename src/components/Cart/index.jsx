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
import { useEffect, useState } from "react"
import commerce from "../../lib/commerce"
import Spinner from "../Spinner"


const Cart = ({ isOpen, setIsOpen }) => {
    const [cartItems, setCartItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        const handleFetchCart = async () => {
            const cartData = await commerce.cart.retrieve()
            setCartItems(cartData)
            setIsLoading(false)
        }
        handleFetchCart()
    }, [])
    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen} >
            <SheetContent className="w-full flex flex-col ">
                <SheetHeader className="text-left">
                    <SheetTitle>Cart</SheetTitle>
                    {!isLoading && cartItems.line_items.length == 0 && (
                        <SheetDescription>
                            Empty Cart
                        </SheetDescription>
                    )}
                </SheetHeader>

                <div className="overflow-y-auto flex-1">
                    <div className="grid gap-4 py-4 ">
                        {
                            isLoading ? <Spinner color="black" /> : cartItems.line_items.length > 0 && cartItems.line_items.map((item, index) => (
                                <CartItem key={`${item}-${JSON.stringify(item.selected_options)}`} selected_options={item.selected_options} image={item.image.url} index={index} price={item.price.formatted_with_symbol} title={item.name} quantity={item.quantity} />
                            ))
                        }
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