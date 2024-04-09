import {
    Table,
    TableBody,
    TableCaption,
    TableCell, TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import Layout from "@/components/Layout"
import { useEffect, useState } from "react"
import Spinner from "@/components/Spinner"
import { useSession } from "next-auth/react"
import { getCommerceJsCustomerByExternalID, getCommerceJsCustomerOrdersById } from "@/lib/helpers"

const Orders = () => {
    const [ordersData, setOrdersData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const session = useSession()
    useEffect(() => {
        const handleFetchUsers = async () => {
            if (session.status == "authenticated") {
                const id = await getCommerceJsCustomerByExternalID(session.data.user.email)
                if (id) {
                    const allOrders = await getCommerceJsCustomerOrdersById(id)
                    if (allOrders && allOrders.length > 0) {
                        const orderInfo = allOrders.map(order => {
                            console.log(order);
                            return {
                                id: order.customer_reference,
                                total: order.order_value.formatted_with_symbol,
                                status_payment: order.status,
                                fulfillment: order.status_fulfillment,
                            }
                        })
                        setIsLoading(false)
                        setOrdersData(orderInfo)
                    }

                    setIsLoading(false)
                } else {
                    setIsLoading(false)
                }
            }
        }

        if (typeof window !== 'undefined') {
            handleFetchUsers()
        }
    }, [session])
    return (
        <Layout
            title="My Orders"
            description="My Orders"
        >
            <div
                style={{ maxWidth: "500px", minHeight: "70vh" }}
                className="container w-full px-4  flex justify-center items-center gap-6 flex-col">
                <h2 className="uppercase text-2xl tracking-wide">My Orders</h2>


                {!isLoading ? (
                    <Table>
                        <TableCaption>list of your Orders.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead >orderID</TableHead>
                                <TableHead>Payment Status</TableHead>
                                <TableHead>Fulfillment</TableHead>
                                <TableHead>Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {ordersData.map((invoice) => (
                                <TableRow key={invoice.id}>
                                    <TableCell className="font-medium">{invoice.id}</TableCell>
                                    <TableCell>{invoice.status_payment}</TableCell>
                                    <TableCell>{invoice.fulfillment}</TableCell>
                                    <TableCell>{invoice.total}</TableCell>
                                </TableRow>
                            ))
                            }
                        </TableBody>
                    </Table>
                ) : (
                    <Spinner color="black" />
                )}

            </div>
        </Layout>
    )
}

export default Orders
{/* <TableFooter>
    <TableRow>
        <TableCell colSpan={3}>Total</TableCell>
        <TableCell className="text-right">$2,500.00</TableCell>
    </TableRow>
</TableFooter> */}