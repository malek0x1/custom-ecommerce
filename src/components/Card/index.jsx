import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product }) => {
    return (
        <div className={`bg-white overflow-hidden`}>
            <Link prefetch={false} href={`/product/${product.id}`}>
                <div className="relative">
                    <Image
                        width={1300}
                        height={1300}
                        // className="h-44 lg:h-60 object-contain"
                        src={product.image.url}
                        // src="https://media-cdn.paulandshark.com/ecom/site/M/24411570-050-af-v.jpg"
                        // src="https://ayushinvienna.com/cdn/shop/files/Dolana_dress_walk.webp?v=1685908056&width=180 180w 225h"
                        // src={'https://cdn.chec.io/merchants/56289/assets/MXcJNajhN9FDUWW0|06bde6529ecec91eca430963c5fbea9bbeca6834-600x600.jpg'}
                        unoptimized
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
