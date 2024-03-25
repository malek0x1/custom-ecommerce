
import Skeleton from 'react-loading-skeleton'


const HeroSkeleton = () => {
    return (

        <div style={{ height: `calc(100vh - 200px)` }} className=" w-full">
            <Skeleton duration={0.8} count={1} className='h-full w-full' />
        </div>

    )
}

export default HeroSkeleton

