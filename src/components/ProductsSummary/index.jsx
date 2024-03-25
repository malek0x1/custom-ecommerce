import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useEcommerceContext } from "@/lib/context/context"
import CartItem from "../Cart/CartItem"
import Skeleton from "react-loading-skeleton"
import { useEffect, useState } from "react"


const ProductsSummary = ({ checkoutData, chosenShippingOption, allShippingOptions }) => {
    const { cartItems } = useEcommerceContext()
    const [shippingItem, setShippingItem] = useState(null)




    useEffect(() => {
        const getItem = allShippingOptions.filter(item => item.id == chosenShippingOption)
        if (getItem.length > 0) {
            setShippingItem(getItem[0])
        }
    }, [chosenShippingOption])
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <div className="flex w-full items-center justify-between">
                        <p className=" text-xs">Show Order Summary</p>
                        <p className="font-bold text-xs">{checkoutData?.total?.formatted}</p>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="grid gap-4 py-4 ">
                        {
                            cartItems.loading ?
                                <Skeleton duration={0.7} className="w-full mb-2" height={100} count={2} /> :
                                cartItems.line_items.length > 0 &&
                                cartItems.line_items.map((item, index) => (
                                    <CartItem imageMaxWidth="60px" showDelete={false} id={item.id} key={`${item}-${JSON.stringify(item.selected_options)}`} selected_options={item.selected_options} image={item.image.url} index={index} price={item.price.formatted_with_symbol} title={item.name} quantity={item.quantity} />
                                ))
                        }

                        <div className="pt-5 grid gap-1">
                            <div className="flex items-center justify-between">
                                <p>subtotal</p>
                                <p className="font-bold">{checkoutData?.total?.formatted_with_code}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p>shipping</p>
                                <p>{chosenShippingOption ? shippingItem?.price?.formatted_with_symbol : "Choose a shipping option"} </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p>Total</p>
                                <p className="font-bold">{checkoutData?.total?.formatted} USD</p>
                            </div>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

    )
}

export default ProductsSummary