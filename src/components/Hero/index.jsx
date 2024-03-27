
import { urlFor } from '@/lib/sanity'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import dynamic from 'next/dynamic'
import HeroPicture from '../Picture'


const Hero = ({ mobileImageUrl, desktopImageUrl }) => {
    return (
        <Carousel>
            <CarouselContent >
                <CarouselItem className=" pl-0">
                    <div className="bg-gray-300 w-full hero-wrapper">
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

