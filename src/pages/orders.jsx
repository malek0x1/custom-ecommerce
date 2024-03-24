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
import commerce from "../lib/commerce"
import Spinner from "@/components/Spinner"
import { useSession } from "next-auth/react"

const Orders = () => {
    const [ordersData, setOrdersData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const session = useSession()
    useEffect(() => {
        const handleFetchUsers = async () => {
            console.log(1);
            if (session.status == "authenticated") {
                console.log(2);
                const id = commerce.customer.id()
                console.log(3);
                console.log(id);
                if (id) {
                    const allOrders = await commerce.customer.getOrders(id);
                    if (allOrders.data && allOrders.data.length) {
                        const orderInfo = allOrders.data.map(order => {
                            return {
                                id: order.id,
                                total: order.order_value.formatted_with_symbol,
                                status_payment: order.status_payment || "123",
                            }
                        })
                        setIsLoading(false)
                        setOrdersData(orderInfo)
                    }

                    setIsLoading(false)
                }
            }
            // commerce.customer.about().then(x => {
            //     commerce.customer.getOrders(x.id).then(data => {
            //         if (data.data) {

            // const orderInfo = data.data.map(order => {
            //     return {
            //         id: order.id,
            //         total: order.order_value.formatted_with_symbol,
            //         status_payment: order.status_payment || "123",
            //     }
            // })
            // setIsLoading(false)
            // setOrdersData(orderInfo)
            //         }
            //     })

            // }).catch(e => {
            //     console.log(e);
            // })
        }

        if (typeof window !== 'undefined') {
            handleFetchUsers()
        }
    }, [session])
    return (
        <Layout
            title="test"
            description="test"
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
                                <TableHead>Status</TableHead>
                                <TableHead>Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {ordersData.map((invoice) => (
                                <TableRow key={invoice.id}>
                                    <TableCell className="font-medium">{invoice.id}</TableCell>
                                    <TableCell>{invoice.status_payment}</TableCell>
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