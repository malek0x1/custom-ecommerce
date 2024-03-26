import Image from 'next/image'
import Button from '../Button'

const ImageWithDescription = ({ img, title, description, btnLabel }) => {
    return (
        <div className="flex justify-between w-full flex-wrap-reverse md:flex-nowrap my-4">
            <div className="">
                <Image
                    src={img}
                    height={600}
                    loading="eager"
                    alt=""
                    width={600}
                />
            </div>
            <div className="flex p-8 md:p-10 flex-col justify-between bg-gray-50 w-full text-white gap-8">
                <p className="text-3xl w-60 text-gray-900">
                    {title}
                </p>
                <div className="grid gap-4 text-gray-800">
                    <p className="max-w-80">
                        {description}
                    </p>
                    <Button className="  hover:bg-gray-300 md:w-80" label={btnLabel || 'Discover More'} />
                </div>
            </div>
        </div>
    )
}

export default ImageWithDescription