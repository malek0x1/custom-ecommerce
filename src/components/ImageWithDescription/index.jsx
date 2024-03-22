import Image from 'next/image'
import Button from '../Button'

const ImageWithDescription = () => {
    return (
        <div className="flex justify-between w-full flex-wrap-reverse md:flex-nowrap my-4">
            <div className="">
                <Image
                    src="https://cdn.chec.io/merchants/56289/assets/MXcJNajhN9FDUWW0|06bde6529ecec91eca430963c5fbea9bbeca6834-600x600.jpg"
                    height={600}
                    loading="lazy"
                    alt=""
                    width={600}
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
    )
}

export default ImageWithDescription