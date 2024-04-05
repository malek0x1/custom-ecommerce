import { useEffect, useState } from "react"
import SkeletonCard from "../Card/SkeletonCard"
import Button from "../Button"
import Skeleton from "react-loading-skeleton"
import ProductCard from "../Card"
import commerce from "../../lib/commerce"
import Link from "next/link"

const Grid = ({ collection, amount = 4 }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [products, setProducts] = useState([])

    useEffect(() => {
        const handleProductFetching = async () => {
            const productsData = await commerce.products.list({
                category_slug: [collection],
                limit: amount,
                sortBy: "created",
                sortDirection: "desc"
            })
            if (productsData.data && productsData.data.length) {
                setProducts(productsData.data)
            }
            setIsLoading(false)
        }
        if (collection) {
            handleProductFetching()
        }
    }, [collection])

    return (
        <div className="">
            {isLoading ? (
                <div className="">
                    <div className="flex flex-wrap" >
                        {[1, 2, 3, 4].map(_ => (
                            <div key={_} className="w-1/2 sm:w-1/3 md:w-1/4 px-1">
                                <SkeletonCard />
                            </div>
                        ))}
                    </div>
                    <div className="w-full flex justify-center flex-col items-center">
                        <Skeleton duration={0.8} className="mt-6" count={1} width={105} height={35} />
                    </div>
                </div>
            ) :
                (
                    <div className="">


                        <div className="relative flex  justify-between px-2 pt-4 items-center">
                            <p className="text-left text-lg uppercase tracking-wider">{collection} Collection</p>
                            <div
                                style={{
                                    fontSize: "10px"
                                }}
                                className="underline  uppercase">
                                {/* <Link prefetch={false} href={`/collection/${collection}`}>
                                    Show All
                                </Link> */}
                            </div>
                        </div>


                        <div className="flex flex-wrap mt-4">
                            {products.map(product => (
                                <div key={product.id} className="sm:w-1/3 w-1/2  px-0.5">
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                        <div className="w-full flex justify-center  items-center">
                            <Link href={`/collection/${collection}`}>
                                <Button label="Show More" className="w-fit px-6 text-xs uppercase mt-6" />
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Grid