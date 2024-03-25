import { urlFor } from '@/lib/sanity';
import dynamic from 'next/dynamic';

const Grid = dynamic(() => import('../Grid/index'))
const Hero = dynamic(() => import('../Hero/index'))
const ImageWithDescription = dynamic(() => import("@/components/ImageWithDescription"));
const MainCategory = dynamic(() => import("@/components/MainCategory"));
const ProductsCarousel = dynamic(() => import("@/components/ProductsCarousel"));

export const Module = ({
    index,
    module,
}) => {
    const type = module._type

    switch (type) {
        case 'hero':
            return <Hero desktopImageUrl={module.desktop_image} mobileImageUrl={module.mobile_image} />
        case 'grid':
            return <Grid index={index} collection={module.category} amount={module.amount} />
        case 'image_with_description':
            return <ImageWithDescription title={module.title} btnLabel={module?.btn_label} description={module.description} img={urlFor(module.image.asset)} />
        case 'carousel':
            return <ProductsCarousel collection={module.category} index={index} />
        case 'featured_category':
            return (
                <div className="flex flex-wrap sm:flex-nowrap gap-4 justify-between sm:container w-full items-center">
                    {module.items.map(item => (
                        <MainCategory description={item.description} btn_label={item.btn_label} img={urlFor(item.image.asset)} title={item.title} key={item._key} />
                    ))}
                </div>)

        default:
            return null
    }
}
