import { getImageProps } from 'next/image'
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

export default function HeroPicture({ mobileSrc, desktopSrc }) {
    const common = { alt: 'Theme Example', fill: true }
    const {
        props: { srcSet: deskTop },
    } = getImageProps({ ...common, src: desktopSrc })
    const {
        props: { srcSet: mobile, ...rest },
    } = getImageProps({ ...common, src: mobileSrc, priority: true, fetchPriority: "high" })

    // exp
    const [imageLoaded, setImageLoaded] = useState(false);
    const handleImageLoaded = () => {
        setImageLoaded(true);
    }


    return (
        <picture>
            {!imageLoaded && (
                <div style={{ height: `calc(100vh - 200px)` }} className=" w-full">
                    <Skeleton duration={0.8} count={1} className='h-full w-full' />
                </div>
            )}
            <source media="(min-width: 900px)" srcSet={deskTop} />
            <source media="(min-width: 300px)" srcSet={mobile} />
            <img
                {...rest}
                onLoad={handleImageLoaded}
                className={`${imageLoaded ? "w-full" : "!w-0"} object-cover`}
            />
        </picture>
    )
}