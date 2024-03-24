import { getImageProps } from 'next/image'

export default function HeroPicture({ mobileSrc, desktopSrc }) {
    const common = { alt: 'Theme Example', fill: true }//width: 2000, height: 2000 }
    const {
        props: { srcSet: deskTop },
    } = getImageProps({ ...common, src: desktopSrc })
    const {
        props: { srcSet: mobile, ...rest },
    } = getImageProps({ ...common, src: mobileSrc })

    console.log("deskTop", deskTop);

    return (
        <picture>
            <source media="(min-width: 900px)" srcSet={deskTop} />
            <source media="(min-width: 300px)" srcSet={mobile} />
            <img {...rest} className='w-full object-cover' />
        </picture>
    )
}