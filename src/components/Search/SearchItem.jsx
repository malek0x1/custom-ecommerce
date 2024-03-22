import Image from "next/image"
import Link from "next/link"

const SearchItem = ({ setIsOpen, product }) => {
    return (
        <Link onClick={() => { setIsOpen(false) }} href={`/product/${product.permalink}`} className="flex gap-2 items-center" key={product.id}>
            <Image unoptimized alt="asd" src={product.image.url || "/assets/images/demo.jpg"} width="100" height="50" className="w-20 object-cover" />
            <div className="">
                <p className="text-thin text-xs text-gray-700">{product.name}</p>
                <p className="text-thin text-xs text-gray-700">{product.price.formatted_with_symbol}</p>
            </div>
        </Link>
    )
}

export default SearchItem