import AnimatedComponent from '../AnimationComponent'
import Button from '../Button'

const MainCategory = ({ title, description, btn_label, img }) => {
    return (
        <div
            style={{
                backgroundImage: `url("${img}")`,
            }}
            className="home-main-collections relative h-96 flex items-end p-4 ">
            <div className="absolute inset-0 bg-black opacity-15"></div>
            <div className="grid gap-3 relative z-10">

                <AnimatedComponent>
                    <p className="uppercase text-white text-2xl">{title}</p>
                    <p className="uppercase text-gray-300 text-xs w-10/12 ">{description}</p>
                    <Button className="bg-white text-black hover:bg-gray-300 md:w-80" label={btn_label || `SHOP NOW`} />
                </AnimatedComponent>
            </div>
        </div>
    )
}

export default MainCategory