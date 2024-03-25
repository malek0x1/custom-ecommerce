import Image, { getImageProps } from 'next/image'

export default function HeroPicture({ mobileSrc, desktopSrc }) {
    const common = { alt: 'Theme Example', fill: true }
    const {
        props: { srcSet: deskTop },
    } = getImageProps({ ...common, src: desktopSrc })
    const {
        props: { srcSet: mobile, ...rest },
    } = getImageProps({ ...common, src: mobileSrc, priority: true, fetchPriority: "high", loading: "eager" })

    return (
        <Image src={mobileSrc} alt="" fill className='w-full h-full object-cover' />
        // <picture>
        //     <source media="(min-width: 900px)" srcSet={deskTop} />
        //     <source media="(min-width: 300px)" srcSet={mobile} />
        //     <img {...rest} className='w-full object-cover' />
        // </picture>
    )
}