import dynamic from 'next/dynamic';
import Layout from "@/components/Layout";
import { CiShoppingBasket } from "react-icons/ci";

const Hero = dynamic(() => import("@/components/Hero"));
const ImageWithDescription = dynamic(() => import("@/components/ImageWithDescription"));
const MainCategory = dynamic(() => import("@/components/MainCategory"));
const ProductsCarousel = dynamic(() => import("@/components/ProductsCarousel"));

export default function Home() {
  return (
    <Layout
      title="test"
      description="test"
    >
      <Hero />
      <ProductsCarousel collection="apple" />

      <div className="">
        <ImageWithDescription />
      </div>
      <ProductsCarousel collection="laptops" />
      <div className="flex flex-wrap sm:flex-nowrap gap-4 justify-between sm:container w-full items-center">
        <MainCategory />
        <MainCategory />
      </div>
      <div className="flex flex-col bg-gray-50 sm:flex-row justify-between items-center gap-10 py-10">
        {[1, 2, 3, 4].map(item => (
          <div key={item} className="flex-1 text-center flex px-3 justify-center items-center gap-3 flex-col">
            <CiShoppingBasket size={40} color="black" />
            <p className="text-lg uppercase">Free Shipping</p>
            <p className="text-xs text-gray-800 w-10/12" >We Offer Free shipping on all Us orders and all internatiols orders over 150$.</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}
