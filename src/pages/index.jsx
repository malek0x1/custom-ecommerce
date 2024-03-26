import Layout from "@/components/Layout";
import { useEffect, useState } from 'react';
import { getPageBySlug } from '@/lib/helpers';
import { Module } from '@/components/Modules';
import Skeleton from 'react-loading-skeleton';
import HeroSkeleton from '@/components/Hero/HeroSkeleton';
import SkeletonCard from '@/components/Card/SkeletonCard';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import CartIcon from "@/components/SvgComponents/Cart";

export default function Home() {
  const [isFullLoading, setIsFullLoading] = useState(true)
  const [pageData, setPageData] = useState(null)

  useEffect(() => {
    const handlePage = async () => {

      const res = await getPageBySlug("home-page")
      if (res.modules && res.modules.length > 0) {
        setPageData(res)
      }
      setIsFullLoading(false)
    }
    handlePage()
  }, [])
  return (
    <Layout
      title="test"
      description="test"
      isFooter={!isFullLoading}
    >

      <div className="flex flex-col gap-5">
        {isFullLoading ? (
          <div>
            <HeroSkeleton />
            <Carousel>
              <div className="relative flex justify-between pt-4  px-2 items-center">
                <Skeleton duration={0.8} count={1} height={20} width={120} />
                <Skeleton duration={0.8} count={1} height={20} width={50} />
              </div>
              <CarouselContent className="ml-1 gap-1 mt-4 items-center">
                {
                  [1, 2, 3, 4].map(item => (
                    <CarouselItem key={item} className="lg:basis-1/4 pl-0 basis-1/2">
                      <SkeletonCard />
                    </CarouselItem>
                  ))

                }

              </CarouselContent>
            </Carousel>
            <HeroSkeleton />
          </div>
        ) :
          pageData?.modules?.map((module, key) => (
            <Module key={key} module={module} />
          ))}

        <div className="flex flex-col bg-gray-50 sm:flex-row justify-between items-center gap-10 py-10">
          {[1, 2, 3, 4].map(item => (
            <div key={item} className="flex-1 text-center flex px-3 justify-center items-center gap-3 flex-col">
              <CartIcon
                fill="#c47961"
              />
              {/* <Image
                src="/assets/icons/cart.svg"
              unoptimized
              width={35}
              height={35}
              onClick={() => {
                setIsMobileNavOpen(prev => !prev)
              }} /> */}


              <p className="text-lg uppercase">Free Shipping</p>
              <p className="text-xs text-gray-800 w-10/12" >We Offer Free shipping on all Us orders and all internatiols orders over 150$.</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
