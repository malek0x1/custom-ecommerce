import { Skeleton } from "../ui/skeleton"

const SkeletonCard = () => {
    return (
        <div className=" rounded-lg border-separate  w-full">
            <div href={`/product/`}>
                <div className="relative">
                    <Skeleton className="w-full h-44 animate-in animate-pulse" />

                </div>
            </div>
            <div className="p-4">
                <div href={`/product/`}>
                    <Skeleton className="w-full h-4 mb-2 animate-in animate-pulse" />
                </div>
                <Skeleton className="w-20 h-4 animate-in animate-pulse" />


            </div>
        </div>
    )
}

export default SkeletonCard