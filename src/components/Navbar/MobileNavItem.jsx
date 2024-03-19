import Link from "next/link";
import { HiOutlineChevronRight } from "react-icons/hi2";
import { motion } from "framer-motion";

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
                <h4 className="font-medium uppercase leading-none">{label}</h4>
                <HiOutlineChevronRight size={14} />
            </Link>
        </motion.div>
    )
}

export default MobileNavItem