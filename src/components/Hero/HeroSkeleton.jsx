
import Skeleton from 'react-loading-skeleton'


const HeroSkeleton = () => {
    return (

        <div className=" w-full hero-wrapper">
            <Skeleton duration={0.8} count={1} className='h-full w-full' />
        </div>

    )
}

export default HeroSkeleton

