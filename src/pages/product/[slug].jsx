import { useEffect, useState } from "react"
import commerce from "../../lib/commerce"
import { useRouter } from "next/router"
import { getInitialVariants, handleChosenVariants } from "@/lib/helpers"
import Spinner from "@/components/Spinner"
import Image from "next/image"
import Variant from "@/components/Variant"
import Button from "@/components/Button"
import Layout from "@/components/Layout"
import Skeleton from "react-loading-skeleton"
import { useEcommerceContext } from "@/lib/context/context"

const Product = () => {
    const [product, setproduct] = useState([])
    const [isFullLoading, setIsFullLoading] = useState(true)
    const [chosenVariants, setChosenVaritants] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const { setIsCartOpened, updateCart } = useEcommerceContext()

    const router = useRouter()

    useEffect(() => {
        const handleProduct = async () => {
            const { slug } = router.query
            if (slug) {
                setIsFullLoading(true)
                const productData = await commerce.products.retrieve(slug, { type: "permalink" })
                if (productData.id) {
                    setproduct(productData)
                    if (productData.variant_groups && productData.variant_groups.length) {
                        // select initial variant
                        const variantsInitial = getInitialVariants(productData)
                        setChosenVaritants(variantsInitial)
                    }
                    setIsFullLoading(false)

                } else {
                    router.push("/404")
                }
            }
        }
        handleProduct();
    }, [router.query.slug])

    const handleAddToCart = async () => {
        setIsLoading(true);
        const { id } = product;
        const formatVariants = handleChosenVariants(chosenVariants);
        const res = await commerce.cart.add(id, 1, formatVariants);
        updateCart(res);
        setIsLoading(false);
        setIsCartOpened(true);
    };

    return (
        <Layout
            title={product?.name || "Product Page"}
            description={product?.name || "Product Page"}
        >
            <div className="md:container">
                {isFullLoading ?
                    (
                        <div className="w-full">
                            <div className="flex gap-10 flex-wrap sm:flex-nowrap ">
                                <div className="w-full">
                                    <Skeleton duration={0.8} count={1} className="w-full" height={400} />
                                </div>
                                <div className="w-full ">
                                    <Skeleton duration={0.8} count={1} className="w-1/2 mx-3 mt-6" width={280} height={30} />
                                    <Skeleton duration={0.8} count={1} className="w-1/2 mx-3 mt-6" width={100} height={30} />
                                    <Skeleton duration={0.8} count={1} className="w-1/2 mx-3 mt-6" width={60} height={15} />
                                    <div className="flex gap-3 mx-3">
                                        {[1, 2, 3, 4].map(item => (
                                            <Skeleton key={item} duration={0.8} count={1} className=" mt-2" width={60} height={40} />
                                        ))}
                                    </div>
                                    <div className="mx-2">
                                        <Skeleton duration={0.8} count={1} className="w-full sm:w-1/2 mt-2 " height={40} />
                                    </div>
                                </div>
                            </div>


                        </div>
                    )
                    : (
                        <div className="">
                            <div className="flex gap-10 flex-wrap sm:flex-nowrap ">
                                <Image
                                    style={{
                                        maxWidth: "400px",
                                        objectFit: "cover",
                                        width: "100%"
                                    }}
                                    width={product.image.image_dimensions.width}
                                    height={product.image.image_dimensions.height}
                                    src={product.image.url}
                                    unoptimized
                                    priority="true"
                                    alt=""
                                />
                                <div className="w-full grid gap-4 mx-3"
                                    style={{
                                        maxWidth: "500px"
                                    }}
                                >
                                    <p className="uppercase tracking-widest">{product.name}</p>
                                    <p className="uppercase tracking-widest ">{product.price.formatted_with_symbol}</p>
                                    {product.variant_groups.length > 0 &&
                                        product.variant_groups.map(variant => (
                                            <Variant variantGroupId={variant.id} key={variant.name} type={variant.name} setChosenVariant={setChosenVaritants} chosenVariant={chosenVariants[variant.name]} variants={variant?.options} />
                                        ))}
                                    <Button
                                        onClick={handleAddToCart}
                                        disabled={isLoading}
                                        className="w-full"
                                        label={isLoading ? <Spinner color="white" /> : "Add to Cart"} />


                                    <p dangerouslySetInnerHTML={{ __html: product.description }} />
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </Layout>
    )
}

export default Product