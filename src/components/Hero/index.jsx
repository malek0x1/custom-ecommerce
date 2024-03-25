
import { urlFor } from '@/lib/sanity'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import dynamic from 'next/dynamic'

const HeroPicture = dynamic(() => import('../Picture/index'))

const Hero = ({ mobileImageUrl, desktopImageUrl }) => {
    return (
        <Carousel>
            <CarouselContent >
                <CarouselItem className="lg:basis-full pl-0">
                    <div style={{ height: `calc(100vh - 100px)` }} className="bg-gray-300 w-full">
                        <HeroPicture
                            desktopSrc={urlFor(desktopImageUrl.asset)}
                            mobileSrc={urlFor(mobileImageUrl.asset)}
                        />
                    </div>
                </CarouselItem>

            </CarouselContent>
        </Carousel>
    )
}

export default Hero

