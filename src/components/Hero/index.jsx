
import HeroPicture from '../Picture'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import 'react-loading-skeleton/dist/skeleton.css'


const Hero = ({ mobileImageUrl, desktopImageUrl }) => {
    return (
        <Carousel>
            <CarouselContent >
                <CarouselItem className="lg:basis-full pl-0">
                    <div style={{ height: `calc(100vh - 200px)` }} className="bg-red-500 w-full">
                        <HeroPicture
                            desktopSrc="/assets/images/hero-desktop.jpg"
                            mobileSrc="/assets/images/hero-mobile.jpg"
                        />
                        {/* <picture>
                            <source media="(min-width: 1120px)"
                                srcset="https://www.tartcollections.com/cdn/shop/files/desktop-spring-sale.jpg?v=1710979786" />
                            <source media="(min-width: 900px)"
                                srcset="https://www.tartcollections.com/cdn/shop/files/desktop-spring-sale_960x600.jpg?v=1710979786" />
                            <img
                                width="100%"
                                height="100%"
                                class="picture__block, Slideshow__Image"
                                data-nulls=""
                                src="https://www.tartcollections.com/cdn/shop/files/desktop-spring-sale_500x400.jpg?v=1710979786"
                                alt="" loading="lazy" style={{ opacity: 1 }} />
                        </picture> */}
                        {/* <img class="image-fit hero__image hero__image--image_cTFCB3 lazyautosizes lazyloaded"
                            src=""
                            data-aspectratio="1.5003663003663004"
                            data-sizes="auto"
                            data-parent-fit="cover"
                            alt=""
                            data-srcset="//shopbeachcity.com/cdn/shop/files/Home_page_banner_13_180x.png?v=1709879274 180w, //shopbeachcity.com/cdn/shop/files/Home_page_banner_13_360x.png?v=1709879274 360w, //shopbeachcity.com/cdn/shop/files/Home_page_banner_13_540x.png?v=1709879274 540w, //shopbeachcity.com/cdn/shop/files/Home_page_banner_13_720x.png?v=1709879274 720w, //shopbeachcity.com/cdn/shop/files/Home_page_banner_13_900x.png?v=1709879274 900w, //shopbeachcity.com/cdn/shop/files/Home_page_banner_13_1080x.png?v=1709879274 1080w, //shopbeachcity.com/cdn/shop/files/Home_page_banner_13_1296x.png?v=1709879274 1296w, //shopbeachcity.com/cdn/shop/files/Home_page_banner_13_1512x.png?v=1709879274 1512w, //shopbeachcity.com/cdn/shop/files/Home_page_banner_13_1728x.png?v=1709879274 1728w, //shopbeachcity.com/cdn/shop/files/Home_page_banner_13_1944x.png?v=1709879274 1944w, //shopbeachcity.com/cdn/shop/files/Home_page_banner_13_2160x.png?v=1709879274 2160w, //shopbeachcity.com/cdn/shop/files/Home_page_banner_13_2376x.png?v=1709879274 2376w, //shopbeachcity.com/cdn/shop/files/Home_page_banner_13_2592x.png?v=1709879274 2592w, //shopbeachcity.com/cdn/shop/files/Home_page_banner_13_2808x.png?v=1709879274 2808w, //shopbeachcity.com/cdn/shop/files/Home_page_banner_13_3024x.png?v=1709879274 3024w" sizes="419px"
                            srcset="//shopbeachcity.com/cdn/shop/files/Home_page_banner_13_180x.png?v=1709879274 180w, //shopbeachcity.com/cdn/shop/files/Home_page_banner_13_360x.png?v=1709879274 360w, //shopbeachcity.com/cdn/shop/files/Home_page_banner_13_540x.png?v=1709879274 540w, //shopbeachcity.com/cdn/shop/files/Home_page_banner_13_720x.png?v=1709879274 720w, //shopbeachcity.com/cdn/shop/files/Home_page_banner_13_900x.png?v=1709879274 900w, //shopbeachcity.com/cdn/shop/files/Home_page_banner_13_1080x.png?v=1709879274 1080w, //shopbeachcity.com/cdn/shop/files/Home_page_banner_13_1296x.png?v=1709879274 1296w, //shopbeachcity.com/cdn/shop/files/Home_page_banner_13_1512x.png?v=1709879274 1512w, //shopbeachcity.com/cdn/shop/files/Home_page_banner_13_1728x.png?v=1709879274 1728w, //shopbeachcity.com/cdn/shop/files/Home_page_banner_13_1944x.png?v=1709879274 1944w, //shopbeachcity.com/cdn/shop/files/Home_page_banner_13_2160x.png?v=1709879274 2160w, //shopbeachcity.com/cdn/shop/files/Home_page_banner_13_2376x.png?v=1709879274 2376w, //shopbeachcity.com/cdn/shop/files/Home_page_banner_13_2592x.png?v=1709879274 2592w, //shopbeachcity.com/cdn/shop/files/Home_page_banner_13_2808x.png?v=1709879274 2808w, //shopbeachcity.com/cdn/shop/files/Home_page_banner_13_3024x.png?v=1709879274 3024w"
                        /> */}


                    </div>
                </CarouselItem>

            </CarouselContent>
        </Carousel>
    )
}

export default Hero

