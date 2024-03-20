import { useEffect, useState } from 'react'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import commerce from "../../lib/commerce"
import ProductCard from '../Card'
import SkeletonCard from '../Card/SkeletonCard'
import Link from 'next/link'

const ProductsCarousel = ({ collection }) => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const handleProducts = async () => {
            const productsData = await commerce.products.list({
                category_slug: [collection],
                limit: 6
            })
            setProducts(productsData.data)
            setIsLoading(false)
        }
        handleProducts()
    }, [])
    return (
        <Carousel >
            {
                isLoading ? (
                    <div className="relative ">
                        {/* <p className="text-left text-lg uppercase pt-4  pl-4 tracking-wider">Apple</p> */}
                        {/* <div className="absolute left-4 bottom-0 h-0.5 w-14  bg-gray-300"></div> */}
                    </div>
                ) : (
                    <div className="relative flex justify-between pt-4  px-2 items-center">
                        <p className="text-left text-lg uppercase tracking-wider">Apple Collection</p>
                        {/* <div className="absolute left-4 bottom-0 h-0.5 w-24 bg-gray-700"></div> */}
                        <div
                            style={{
                                fontSize: "10px"
                            }}
                            className="underline  uppercase">
                            <Link prefetch={false} href={`/collection/${collection}`}>
                                Show All
                            </Link>
                        </div>
                    </div>
                )
            }
            <CarouselContent className="ml-1 gap-1 pt-4 items-center">
                {isLoading ?
                    [1, 2, 3, 4].map(item => (
                        <CarouselItem key={item} className="lg:basis-1/4 pl-0 basis-1/2">
                            <SkeletonCard />
                        </CarouselItem>
                    ))
                    : products.length > 0 &&
                    products.map(item => (
                        <CarouselItem key={item.id} className="lg:basis-1/4 pl-0 basis-1/2 ">
                            <ProductCard product={item} />
                        </CarouselItem>
                    ))
                }

            </CarouselContent>
        </Carousel>
    )
}

export default ProductsCarousel