import Image from 'next/image'
import AnimatedComponent from '../AnimationComponent'
import Button from '../Button'

const MainCategory = ({ title, description, btn_label, img }) => {
    return (
        <div className="relative h-96 flex items-end p-4 flex-1">
            <div className="absolute inset-0 z-10 bg-black opacity-15"></div>
            <Image
                className='object-cover'
                alt={title}
                src={img}
                fill
            />
            <div className="grid gap-3 relative z-20">
                <AnimatedComponent>

                    <p className="uppercase text-white text-2xl">{title}</p>
                    <p className="uppercase text-gray-100 text-xs w-10/12 my-2">{description}</p>
                    <Button className="bg-white text-black hover:bg-gray-300 md:w-80" label={btn_label || `SHOP NOW`} />
                </AnimatedComponent>
            </div>
        </div>
    )
}

export default MainCategory