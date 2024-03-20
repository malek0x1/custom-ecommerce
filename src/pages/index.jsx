import Button from "@/components/Button";
import Hero from "@/components/Hero";
import Layout from "@/components/Layout";
import MainCategory from "@/components/MainCategory";
import ProductsCarousel from "@/components/ProductsCarousel";
import Image from "next/image";
import { CiShoppingBasket } from "react-icons/ci";

export default function Home() {

  return (
    <Layout
      title="test"
      description="test"
    >
      <Hero />
      <ProductsCarousel collection="apple" />

      <div className="">
        <div className="flex justify-between w-full flex-wrap-reverse md:flex-nowrap">
          <div className="">
            <Image
              src="https://cdn.chec.io/merchants/56289/assets/MXcJNajhN9FDUWW0|06bde6529ecec91eca430963c5fbea9bbeca6834-600x600.jpg"
              height={800}
              alt=""
              width={800}
            />
          </div>
          <div className="flex p-8 md:p-10 flex-col justify-between bg-black w-full text-white gap-8">
            <p className="text-3xl w-60">
              The Art of Beauty Contemporaneity within classicism
            </p>
            <div className="grid gap-4 text-gray-200">
              <p className="max-w-80">

                Elegance as harmony and perfection, a timeless artwork. The Art of Beauty evokes a universal and everlasting conception of ideal beauty.
              </p>
              <Button className="bg-white text-black hover:bg-gray-300 md:w-80" label="Discover More" />
            </div>
          </div>
        </div>
      </div>

      <ProductsCarousel collection="apple" />
      <div className="flex flex-wrap sm:flex-nowrap gap-4 justify-between sm:container w-full items-center">
        <MainCategory />
        <MainCategory />
      </div>


      <div className="flex flex-col bg-gray-50 sm:flex-row justify-between items-center gap-10 pt-10">
        {[1, 2, 3, 4].map(item => (
          <div key={item} className="flex-1 text-center flex px-3 justify-center items-center gap-3 flex-col">
            <CiShoppingBasket size={40} color="black" />
            <p className="text-lg uppercase">Free Shipping</p>
            <p className="text-xs text-gray-400 w-10/12" >We Offer Free shipping on all Us orders and all internatiols orders over 150$.</p>
          </div>
        ))}

      </div>



    </Layout>
  );
}
