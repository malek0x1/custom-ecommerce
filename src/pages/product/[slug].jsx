import { useEffect, useState } from "react"
import commerce from "../../lib/commerce"
import { useRouter } from "next/router"
import { getInitialVariants, handleChosenVariants } from "@/lib/helpers"
import Spinner from "@/components/Spinner"
import Image from "next/image"
import Variant from "@/components/Variant"
import Button from "@/components/Button"
import Layout from "@/components/Layout"

const Product = () => {
    const [product, setproduct] = useState([])
    const [isFullLoading, setIsFullLoading] = useState(true)
    const [chosenVariants, setChosenVaritants] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    useEffect(() => {
        const handleProduct = async () => {
            const { slug } = router.query
            if (slug) {
                setIsFullLoading(true)
                const productData = await commerce.products.retrieve(slug, { type: "permalink" })
                if (productData.id) {
                    console.log(productData);
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
        alert()
        setIsLoading(true)
        const { id } = product
        const formatVariants = handleChosenVariants(chosenVariants)
        const res = await commerce.cart.add(id, 1, formatVariants);
        setIsLoading(false)
    }


    return (
        <Layout
            title="test"
            description="test"
        >
            <div>
                {isFullLoading ? <div className="m-10"><Spinner color="black" /></div> : (
                    <div className="container">
                        <div className="flex gap-10 flex-wrap">
                            <Image
                                style={{
                                    maxWidth: "600px",
                                    objectFit: "cover",
                                    width: "100%"
                                }}
                                width={product.image.image_dimensions.width}
                                height={product.image.image_dimensions.height}
                                src={product.image.url}
                                // unoptimized
                                priority="high"
                                alt=""
                            />
                            <div className="">
                                <p className="uppercase tracking-widest">{product.name}</p>
                                <p className="uppercase tracking-widest mt-4">{product.price.formatted_with_symbol}</p>


                                {product.variant_groups.length > 0 &&
                                    product.variant_groups.map(variant => (
                                        <Variant variantGroupId={variant.id} key={variant.name} type={variant.name} setChosenVariant={setChosenVaritants} chosenVariant={chosenVariants[variant.name]} variants={variant?.options} />
                                    ))}
                                <Button
                                    onClick={handleAddToCart}
                                    disabled={isLoading}
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