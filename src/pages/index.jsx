import Layout from "@/components/Layout";
import { useEffect, useState } from 'react';
import { getPageBySlug } from '@/lib/helpers';
import { Module } from '@/components/Modules';
import CartIcon from "@/components/SvgComponents/Cart";
import HomeSkeleton from "@/components/HomeSkeleton";
import AnimatedComponent from "@/components/AnimationComponent";
import { HOME_COLS_DATA } from "@/lib/data";

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
      title="Samia Store | Home"
      description=""
      isFooter={!isFullLoading}
    >

      <div className="flex flex-col gap-5">
        {isFullLoading ? (
          <HomeSkeleton />
        ) :
          pageData?.modules?.map((module, key) => (
            <Module key={key} module={module} />
          ))
        }
        <div className="flex flex-col bg-gray-50 sm:flex-row justify-between items-center gap-10 py-10">
          {HOME_COLS_DATA.map(item => (
            <AnimatedComponent key={item.id}>
              <div className="flex-1 text-center flex px-3 justify-center items-center gap-3 flex-col">
                <CartIcon
                  fill="#c47961"
                />
                <p className="text-lg uppercase">{item.title}</p>
                <p className="text-xs text-gray-800 w-10/12" >{item.subtitle}</p>
              </div>
            </AnimatedComponent>
          ))}
        </div>
      </div>
    </Layout>
  );
}
