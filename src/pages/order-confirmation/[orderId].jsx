import Layout from "@/components/Layout"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { getOrderByOrderId } from "@/lib/helpers"
import Spinner from "@/components/Spinner"
import CartItem from "@/components/Cart/CartItem"

const OrderConfirmation = () => {
    const [order, setOrder] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    useEffect(() => {
        const handleOrder = async () => {
            if (router.query.orderId) {
                try {
                    const orderData = await getOrderByOrderId(router.query.orderId)
                    setOrder(orderData)
                    setIsLoading(false)
                } catch (e) {
                    console.log(e);
                }

            }
        }
        handleOrder()
    }, [router.query])

    return (
        <Layout description="" title="">
            <div className="container mb-10 py-10 max-w-3xl">
                <div className="flex items-center justify-center flex-col gap-10">
                    <Image
                        alt="success"
                        src="/assets/icons/order-success.svg"
                        width={80}
                        height={80}
                    />
                    <h3 className="text-xl ">Order Recieved</h3>

                    Your order Details

                    {
                        isLoading ? (
                            <Spinner color="black" />
                        ) : (

                            <div className="w-full ">
                                {order && order.order.line_items.map((item, index) => (
                                    <CartItem imageMaxWidth="60px" showDelete={false} id={item.id} key={`${item}-${JSON.stringify(item.selected_options)}`} selected_options={item.selected_options} image={item.image.url} index={index} price={item.price.formatted_with_symbol} title={item.product_name} quantity={item.quantity} />
                                ))}

                                {order && (
                                    <>
                                        <div className="pt-5 grid gap-1 mt-20">
                                            <div className="flex items-center justify-between">
                                                <p>subtotal</p>
                                                <p className="font-bold">{order.order.subtotal?.formatted_with_code}</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p>shipping</p>
                                                <p>{order.order.shipping.price.formatted_with_code} </p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p>Total</p>
                                                <p className="font-bold">{order.order.total?.formatted_with_code}</p>
                                            </div>
                                        </div>
                                    </>
                                )}

                            </div>
                        )
                    }
                </div>
            </div>
        </Layout>
    )
}

export default OrderConfirmation