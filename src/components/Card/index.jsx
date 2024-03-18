import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white rounded-lg border-separate border-red-500 overflow-hidden">
            <Link href={`/product/${product.id}`}>
                <div className="relative">
                    <Image
                        width={800}
                        height={800}
                        className="h-44 object-contain"
                        src={product.image.url}
                        unoptimized
                        loading="lazy"
                        alt=""
                    />

                </div>
            </Link>
            <div className="p-4">
                <Link href={`/product/${product.id}`}>
                    <p className="block text-gray-600 font-light text-lg mb-2 text-xs hover:text-gray-900">
                        {product.name}
                    </p>
                </Link>
                <p className="text-gray-700 mb-2 text-xs">{product.price.formatted_with_symbol}</p>

            </div>
        </div>
    );
};

export default ProductCard;
