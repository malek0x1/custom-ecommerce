import { getImageProps } from 'next/image'

export default function HeroPicture({ mobileSrc, desktopSrc }) {
    const common = { alt: 'Theme Example', fill: true }
    const {
        props: { srcSet: deskTop },
    } = getImageProps({ ...common, src: desktopSrc })
    const {
        props: { srcSet: mobile, ...rest },
    } = getImageProps({ ...common, src: mobileSrc, loading: "eager" })

    return (
        <picture>
            <source media="(min-width: 900px)" srcSet={deskTop} />
            <source media="(min-width: 300px)" srcSet={mobile} />
            <img  {...rest} className='w-full object-cover' />
        </picture>
    )
}