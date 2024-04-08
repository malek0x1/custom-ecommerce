import HeroSkeleton from '../Hero/HeroSkeleton'
import Skeleton from 'react-loading-skeleton'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import SkeletonCard from '../Card/SkeletonCard'

const HomeSkeleton = () => {
    return (
        <div>
            <HeroSkeleton />
            <Carousel>
                <div className="relative flex justify-between pt-4  px-2 items-center">
                    <Skeleton duration={0.8} count={1} height={20} width={120} />
                    <Skeleton duration={0.8} count={1} height={20} width={50} />
                </div>
                <CarouselContent className="ml-1 gap-1 mt-4 items-center">
                    {
                        [1, 2, 3, 4].map(item => (
                            <CarouselItem key={item} className="lg:basis-1/4 pl-0 basis-1/2">
                                <SkeletonCard />
                            </CarouselItem>
                        ))

                    }

                </CarouselContent>
            </Carousel>
            <HeroSkeleton />
        </div>
    )
}

export default HomeSkeleton