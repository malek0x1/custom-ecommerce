import Layout from "@/components/Layout"
import Image from "next/image"

const OrderConfirmation = () => {
    return (
        <Layout description="" title="">
            <div className="container mb-10 py-10">
                <div className="flex items-center justify-center flex-col gap-10">
                    <Image
                        src="/assets/icons/order-success.svg"
                        width={80}
                        height={80}
                    />
                    <h3 className="text-xl ">Order Recieved</h3>

                    Your order Details
                </div>
            </div>
        </Layout>
    )
}

export default OrderConfirmation