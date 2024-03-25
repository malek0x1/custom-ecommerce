
import Skeleton from 'react-loading-skeleton'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'


const HeroSkeleton = () => {
    return (
        <Carousel>
            <CarouselContent >
                <CarouselItem className="lg:basis-full pl-0">
                    <div style={{ height: `calc(100vh - 200px)` }} className="bg-red-300 meee w-full">
                        <Skeleton duration={0.8} count={1} className='h-full w-full' />
                    </div>
                </CarouselItem>

            </CarouselContent>
        </Carousel>
    )
}

export default HeroSkeleton

