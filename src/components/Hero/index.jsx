import React from 'react'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const Hero = ({ isLoading = true }) => {
    return (
        <Carousel>
            <CarouselContent >
                {!isLoading ? (
                    <CarouselItem className="lg:basis-full pl-0">
                        <div style={{ height: `calc(100vh - 200px)` }} className="bg-red-500 w-full">.</div>
                    </CarouselItem>
                ) : (
                    <CarouselItem className="lg:basis-full pl-0">
                        <Skeleton className='w-full lg:basis-full pl-0'
                            style={{ height: `calc(100vh - 200px)` }}
                            count={1}
                        />
                        {/* <Skeleton className="w-full lg:basis-full pl-0 animate-in animate-pulse" >
                            <div style={{ height: `calc(100vh - 200px)` }} className="w-full"></div>
                        </Skeleton> */}
                    </CarouselItem>

                )}
            </CarouselContent>
        </Carousel>
    )
}

export default Hero