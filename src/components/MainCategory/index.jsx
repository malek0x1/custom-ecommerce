import Button from '../Button'

const MainCategory = () => {
    return (
        <div className="home-main-collections relative h-96 flex items-end p-4 ">
            <div className="absolute inset-0 bg-black opacity-15"></div>
            <div className="grid gap-3 relative z-10">
                <p className="uppercase text-white text-2xl">the basic collection</p>
                <p className="uppercase text-gray-300 text-xs w-10/12 ">Redefining wardrobe essentials with exceptional quality</p>
                <Button className="bg-white text-black hover:bg-gray-300 md:w-80" label="SHOP NOW" />
            </div>
        </div>
    )
}

export default MainCategory