import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product }) => {
    console.log(product.image);
    return (
        <div className={`bg-white overflow-hidden `}>
            <Link prefetch={false} href={`/product/${product.id}`}>
                <div className="relative">
                    <Image
                        width={product.image.image_dimensions.width}
                        height={product.image.image_dimensions.height}
                        src={product.image.url}
                        // unoptimized
                        loading="lazy"
                        alt=""
                    />

                </div>
            </Link>
            <div className="py-3">
                <Link prefetch={false} href={`/product/${product.id}`}>
                    <p className="block text-gray-600 font-light  mb-2 text-xs hover:text-gray-900">
                        {product.name}
                    </p>
                </Link>
                <p className="text-gray-700 mb-2 text-xs">{product.price.formatted_with_symbol}</p>

            </div>
        </div>
    );
};

export default ProductCard;
