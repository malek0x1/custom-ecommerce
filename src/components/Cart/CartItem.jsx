import Image from "next/image"
import { motion } from "framer-motion"

const CartItem = ({ image, title, price, index }) => {
    return (
        <motion.div
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                type: "just",
                delay: 0.1 * index
            }}
        >
            <div className="flex gap-4">
                <Image alt="asd" src={image || "/assets/images/demo.jpg"} width="100" height="100" />
                <div className="">
                    <p className="text-sm mb-3">{title || 'Iphone 16 53gb 2024 64Gb Red  2024 64Gb Red'}</p>
                    <p className="text-thin text-xs text-gray-700">{price || "400$"}</p>
                </div>
            </div>
        </motion.div>

    )
}

export default CartItem