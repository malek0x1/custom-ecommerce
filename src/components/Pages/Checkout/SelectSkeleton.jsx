import React from 'react'
import Skeleton from 'react-loading-skeleton'

const SelectSkeleton = () => {
    return (
        <Skeleton duration={0.8} count={1} className="w-full" height={35} />
    )
}

export default SelectSkeleton