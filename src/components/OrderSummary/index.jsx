import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import CartItem from "../Cart/CartItem"
import Skeleton from "react-loading-skeleton"
import { useEffect, useState } from "react"
import Spinner from "../Spinner"


const OrderSummary = ({ checkoutData, chosenShippingOption, allShippingOptions, cartItems, discount }) => {
    const [shippingItem, setShippingItem] = useState(null)
    const [value, setValue] = useState('closed');


    useEffect(() => {
        const getItem = allShippingOptions.filter(item => item.id == chosenShippingOption)
        if (getItem.length > 0) {
            setShippingItem(getItem[0])
        }
    }, [chosenShippingOption])
    const total = (checkoutData?.total?.raw || 0) + (shippingItem?.price?.raw || 0)


    useEffect(() => {
        if (typeof window !== "undefined") {
            const isOpenOnWideScreen = window.screen.width >= 768;
            setValue(isOpenOnWideScreen ? "item-1" : "closed");
        }
    }, [])

    return (
        <Accordion type="single" collapsible value={value} onValueChange={setValue}>
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <div className="flex w-full items-center justify-between">
                        <p className=" text-xs">Show Order Summary</p>
                        {total ? <p className="font-bold text-xs">{total}$</p> : <Spinner color="black" />}
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="grid gap-4 py-4 ">
                        {
                            !cartItems ?
                                <Skeleton duration={0.7} className="w-full mb-2" height={100} count={2} /> :
                                cartItems.length > 0 &&
                                cartItems.map((item, index) => (
                                    <CartItem imageMaxWidth="60px" showDelete={false} id={item.id} key={`${item}-${JSON.stringify(item.selected_options)}`} selected_options={item.selected_options} image={item.image.url} index={index} price={item.price.formatted_with_symbol} title={item.name} quantity={item.quantity} />
                                ))
                        }

                        <div className="pt-5 grid gap-1">
                            <div className="flex items-center justify-between">
                                <p>subtotal</p>
                                <p className="font-bold">{checkoutData?.subtotal?.formatted_with_code}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p>shipping</p>
                                <p>{chosenShippingOption ? shippingItem?.price?.formatted_with_symbol : "Shipping is not calculcated"} </p>
                            </div>
                            {discount && discount.type && (
                                <div className="flex items-center justify-between">
                                    <p>Discount</p>
                                    <p>{discount.code ? `-${discount.amount_saved.raw}$` : ""} </p>
                                </div>
                            )}
                            <div className="flex items-center justify-between">
                                <p>Total</p>
                                <p className="font-bold">{total} USD</p>
                            </div>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

    )
}

export default OrderSummary