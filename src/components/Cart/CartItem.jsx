import Image from "next/image"

const CartItem = ({ image, title, price }) => {
    return (
        <div className="flex gap-4">
            <Image src={image || "/assets/images/demo.jpg"} width="100" height="100" />
            <div className="">
                <p className="text-sm mb-3">{title || 'Iphone 16 53gb 2024 64Gb Red  2024 64Gb Red'}</p>
                <p className="text-thin text-xs text-gray-700">{price || "400$"}</p>
            </div>
        </div>
    )
}

export default CartItem