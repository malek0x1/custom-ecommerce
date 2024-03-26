import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const MobileNavItem = ({ label, link, index }) => {
    return (
        <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                type: "just",
                delay: 0.1 * index
            }}
        >
            <Link prefetch={false} href={link} className="flex items-center justify-between  py-4 cursor-pointer rounded-sm">
                <p className="font-medium uppercase leading-none">{label}</p>
                <Image
                    src="/assets/icons/chevron-right.svg"
                    unoptimized
                    width={10}
                    height={10}
                />
            </Link>
        </motion.div>
    )
}

export default MobileNavItem