import Link from "next/link";
import Image from "next/image";

const MobileNavItem = ({ label, link, index }) => {
    return (
        <div >
            <Link prefetch={false} href={link} className="flex items-center justify-between  py-4 cursor-pointer rounded-sm">
                <p className="font-medium uppercase leading-none">{label}</p>
                <Image
                    src="/assets/icons/chevron-right.svg"
                    unoptimized
                    width={10}
                    alt="icon"
                    height={10}
                />
            </Link>
        </div>
    )
}

export default MobileNavItem