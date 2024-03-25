
import { urlFor } from '@/lib/sanity'
import HeroPicture from '../Picture'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'


const Hero = ({ mobileImageUrl, desktopImageUrl }) => {
    return (
        <Carousel>
            <CarouselContent >
                <CarouselItem className="lg:basis-full pl-0">
                    <div style={{ height: `calc(100vh - 200px)` }} className="bg-gray-300 w-full">
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

