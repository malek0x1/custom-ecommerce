import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonCard = () => {
    return (
        <div className="rounded-lg w-full">
            <Skeleton count={1} height={200} />
            <Skeleton count={1} />
            <Skeleton count={1} width={40} />
        </div>
        // <div className=" rounded-lg border-separate  w-full">
        //     <div href={`/product/`}>
        //         <div className="relative">
        //             <Skeleton className="w-full h-44 animate-in animate-pulse" />

        //         </div>
        //     </div>
        //     <div className="p-4">
        //         <div href={`/product/`}>
        //             <Skeleton className="w-full h-4 mb-2 animate-in animate-pulse" />
        //         </div>
        //         <Skeleton className="w-20 h-4 animate-in animate-pulse" />


        //     </div>
        // </div>
    )
}

export default SkeletonCard