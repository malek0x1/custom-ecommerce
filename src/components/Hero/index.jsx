
import { urlFor } from '@/lib/sanity'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import HeroPicture from '../Picture'
import AnimatedComponent from '../AnimationComponent'


const Hero = ({ mobileImageUrl, desktopImageUrl }) => {
    return (
        <Carousel>
            <CarouselContent >
                <CarouselItem className=" pl-0">
                    <AnimatedComponent>

                        <div className="bg-gray-300 w-full hero-wrapper">
                            <HeroPicture
                                desktopSrc={urlFor(desktopImageUrl.asset)}
                                mobileSrc={urlFor(mobileImageUrl.asset)}
                            />
                        </div>
                    </AnimatedComponent>
                </CarouselItem>

            </CarouselContent>
        </Carousel>
    )
}

export default Hero

