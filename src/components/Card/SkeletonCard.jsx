import Skeleton from 'react-loading-skeleton'

const SkeletonCard = () => {
    return (
        <div className="rounded-lg w-full">
            <Skeleton duration={0.8} count={1} height={200} />
            <Skeleton duration={0.8} count={1} />
            <Skeleton duration={0.8} count={1} width={40} />
        </div>
    )
}

export default SkeletonCard