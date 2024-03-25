import Layout from "@/components/Layout";
import { useEffect, useState } from 'react';
import { getPageBySlug } from '@/lib/helpers';
import { Module } from '@/components/Modules';
import Skeleton from 'react-loading-skeleton';
import HeroSkeleton from '@/components/Hero/HeroSkeleton';
import SkeletonCard from '@/components/Card/SkeletonCard';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

export default function Home() {
  const [isFullLoading, setIsFullLoading] = useState(true)
  const [pageData, setPageData] = useState(null)

  useEffect(() => {
    const handlePage = async () => {

      const res = await getPageBySlug("home-page")
      console.log(res);
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
    >

      <div className="flex flex-col gap-5">
        {isFullLoading ? (
          <>
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
          </>
        ) :
          pageData?.modules?.map((module, key) => (
            <Module key={key} module={module} />
          ))}
      </div>
    </Layout>
  );
}
