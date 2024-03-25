import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white overflow-hidden  rounded-md ">
            <Link target='_blank' prefetch={false} href={`/product/${product.permalink}`}>
                <div className="relative h-48 overflow-hidden">
                    <Image
                        src={product.image.url}
                        layout="fill"
                        objectFit="contain"
                        unoptimized
                        loading="lazy"
                        alt={product.name}
                    />
                </div>
            </Link>
            <div className="py-3 px-4">
                <Link aria-label={product.name} prefetch={false} href={`/product/${product.permalink}`}>
                    <p className="block text-gray-600 font-light mb-2 text-xs hover:text-gray-900">
                        {product.name}
                    </p>
                </Link>
                <p className="text-gray-700 mb-2 text-xs">{product.price.formatted_with_symbol}</p>
            </div>
        </div>
    );
};

export default ProductCard;
